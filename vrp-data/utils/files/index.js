/*
 * Copyright (C) 2018 Singapore Institute of Manufacturing Technology - All Rights Reserved
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
'use strict';

const log = require('log4js').getLogger('Data');

const _ = require('lodash');
const moment = require('moment');
const Promise = require('bluebird');
const PdfPrinter = require('pdfmake');
const Jimp = require('jimp');
const JSZip = require('jszip');
const excel = require('excel4node');
const { JOB } = require('../../classes');
const vrpSql = require('../../../vrp-sql');
const vrpEnum = require('../../../enum');
const vrpUtils = require('../../../vrp-common/utils');
const vrpConfig = require('../../../configuration');
const vrpMapUtils = require('../../../vrp-map-service/map-utils');

const TIMEZONE = vrpConfig.get('timezone');
const IMAGE_EXT = 'jpg';

/**
 * Get directory path to import template file
 *
 * @returns {String}  todo
 */
exports.importTemplate = () => `${__dirname}/import_template_v5.xlsx`;

/**
 * Generate transaction log for certain period of time defined by `dateScope`. Records are
 * also filtered based on UserGroup defined by `authzScope`. Default `date` is today.
 *
 * @param {Object} scopes  `req.scopes` database scopes generated by `Scope` middleware
 * @param {Object} scopes.authzScope  Determines what records can be viewed by the logged-in user
 * @param {Object} scopes.dateScope  Detemines records of which dates to return
 * @param {Boolean} [requirePhotos=false]  Set true to download note photos and proof of delivery
 * @returns {buffer}  Zip file
 */
exports.transactionLog = async (scopes, requirePhotos) => {
    const startDate = _.get(scopes, 'date.method[1]'); // get the date values from query string
    const endDate = _.isEmpty(_.get(scopes, 'date.method[2]')) ? startDate : scopes.date.method[2];
    requirePhotos = vrpUtils.toBoolean(requirePhotos);

    // args validation
    if (_.isNil(startDate) || !moment(startDate).isValid()) {
        throw new Error('StartDate is invalid.');
    } else if (_.isNil(endDate) || !moment(endDate).isValid()) {
        throw new Error('EndDate is invalid.');
    } else if (_.isNil(requirePhotos)) {
        requirePhotos = false;
    }

    const startDateStr = moment(startDate).format(vrpEnum.DateFormat.DATE);
    const endDateStr = moment(endDate).format(vrpEnum.DateFormat.DATE);
    log.trace(`<TransactionLog> ${startDateStr} to ${endDateStr}, photos ${requirePhotos}`);

    const maxRecords = 5000; // maximum number of rows (i.e. jobs) allowed if requirePhotos is enabled
    const notePhotosFolderName = 'Note Photos'; // name of folder to store note photos
    const podFolderName = 'Proof of Delivery'; // name of folder to store proof of delivery
    const excelColumns = [{
        title: 'Order Id',
        table: 'DeliveryMaster',
        column: 'Id',
    }, {
        title: 'Job Type',
        column: 'JobType',
    }, {
        title: 'Job Sequence',
        column: 'JobSequence',
    }, {
        title: 'Job Status',
        column: 'Status',
        fn: (data) => JOB.getStatusLabel({ Status: data }),
    }, {
        title: 'Delivery Time',
        column: 'ActualDeliveryTime',
    }, {
        title: 'Vehicle Id',
        table: 'DeliveryMaster',
        column: 'VehicleId',
    }, {
        title: 'Position in Route',
        column: 'EngineRouteSeqNum',
    }, {
        title: 'Address',
        column: 'Address',
    }, {
        title: 'Postal',
        column: 'Postal',
    }, {
        title: 'Contact Name',
        column: 'ContactName',
    }, {
        title: 'Contact Phone',
        column: 'ContactPhone',
    }, {
        title: 'Contact Email',
        column: 'ContactEmail',
    }, {
        title: 'Start Time Window',
        column: 'StartTimeWindow',
    }, {
        title: 'End Time Window',
        column: 'EndTimeWindow',
    }, {
        title: 'Service Time',
        column: 'ServiceTime',
    }, {
        title: 'Note From Planner',
        column: 'NoteFromPlanner',
        fn: (data) => JOB.noteColumnToString(data),
    }, {
        title: 'Note From Driver',
        column: 'NoteFromDriver',
        fn: (data) => JOB.noteColumnToString(data),
    }, {
        title: 'Distance (meters)',
        column: [
            'NoteFromDriver',
            'Lat',
            'Lng',
        ],
        fn: (data, addressLat, addressLng) => {
            const driverLocation = _.find(data, (note) => (note.key === 'ActualDeliveryLocation' && !_.isEmpty(note.value)));

            if (driverLocation) {
                const address = { lat: addressLat, lon: addressLng };
                const actualPosition = { lat: _.get(driverLocation, 'value.lat'), lon: _.get(driverLocation, 'value.lng') };

                const distance = vrpMapUtils.calGreatCircleDist(address, actualPosition);

                return Number(distance).toFixed(2); // 2 decimal places only
            }
        },
    }, {
        title: 'Priority',
        table: 'DeliveryMaster',
        column: 'Priority',
    }, {
        title: 'Customer Name',
        table: 'DeliveryMaster',
        column: 'CustomerName',
    }, {
        title: 'Customer Phone',
        table: 'DeliveryMaster',
        column: 'CustomerPhone',
    }, {
        title: 'Customer Email',
        table: 'DeliveryMaster',
        column: 'CustomerEmail',
    }, {
        title: 'Last Attempted By Driver',
        table: 'DeliveryMaster',
        column: 'LastAttemptedByDriver',
    }, {
        title: 'Last Attempted By Plate Number',
        table: 'DeliveryMaster',
        column: 'LastAttemptedByPlateNumber',
    }, {
        title: 'Job Items',
        table: 'DeliveryItems',
        fn: (data) => {
            const qtyArr = _.map(data, (item) => {
                const itemQty = _.toNumber(_.get(item, 'ItemQty', 0));
                return `${itemQty} ${item.ItemId}`;
            });
            return _.join(qtyArr, ', ');
        },
    }, {
        title: 'Actual Job Items',
        table: 'DeliveryItems',
        fn: (data) => {
            const qtyArr = _.map(data, (item) => {
                const itemQty = _.toNumber(_.get(item, 'ActualItemQty', 0));
                return `${itemQty} ${item.ItemId}`;
            });
            return _.join(qtyArr, ', ');
        },
    }, {
        title: 'Verification Code',
        table: 'VerificationCode',
        column: 'Code',
    }, {
        title: 'Vehicle Restriction',
        table: 'DeliveryMaster',
        column: 'VehicleRestriction',
    }];

    // create zip file
    const zip = new JSZip();

    // create excel file to store transaction log information
    const workbook = new excel.Workbook({
        dateFormat: 'm/d/yy hh:mm:ss',
    });
    const worksheet = workbook.addWorksheet('TransactionLog');

    // get jobs information
    const jobs = await vrpSql.DeliveryDetail.scope(scopes.date).findAll({
        where: {
            Status: {
                [vrpSql.sequelize.Op.notIn]: [ // generate log for completed orders only
                    JOB.STATUS.PENDING,
                    JOB.STATUS.EXPECTED_TO_BE_LATE,
                ],
            },
        },
        include: [
            vrpSql.DeliveryMaster.scope(scopes.authz),
            vrpSql.DeliveryItem,
            vrpSql.VerificationCode,
        ],
        order: ['ActualDeliveryTime'], // order by ActualDeliveryTime
    });

    // get photos information
    let notePhotos;
    let pods;
    if (requirePhotos) {
        // create folders to store photos
        zip.folder(notePhotosFolderName);
        zip.folder(podFolderName);

        if (jobs.length > maxRecords) {
            throw new Error(`Photos for transaction log can only be downloaded for at most ${maxRecords} jobs.`);

        } else {
            const whereQuery = {
                where: { DeliveryDetailId: _.map(jobs, 'Id') },
            };

            [notePhotos, pods] = await Promise.all([
                vrpSql.DeliveryNote.findAll(whereQuery),
                vrpSql.DeliveryPOD.findAll(whereQuery),
            ]);
        }
    }

    await Promise.each(jobs, async (job, rowNum) => {
        populateExcel(job, rowNum);

        if (requirePhotos) {
            // add photos
            const notes = _.remove(notePhotos, { DeliveryDetailId: job.Id });
            const pod = _.first(_.remove(pods, { DeliveryDetailId: job.Id })); // ok to use _.first because guaranteed one only

            // add background to photo if necessary
            let signature;
            try {
                signature = await addWhiteBackground(_.get(pod, 'Signature'));
            } catch (err) {
                signature = _.get(pod, 'Signature'); // use signature without background if unable to add background
            }

            await Promise.all([
                addPhotoToZip(notePhotosFolderName, job, _.map(notes, 'Photo')),
                addPhotoToZip(podFolderName, job, [signature, _.get(pod, 'Photo')]),
            ]);
        }
    });

    const buffer = await workbook.writeToBuffer();

    return zip
        .file(`transaction_log_${startDateStr}_to_${endDateStr}.xlsx`, buffer)
        .generateAsync({
            type: 'uint8array',
        });

    function populateExcel(job, rowNum) {
        _.each(excelColumns, (mapping, columnNum) => {
            // set column header
            worksheet.cell(1, (columnNum + 1)).string(mapping.title);

            // get cell value (might be multiple columns for mapping.fn)
            const values = _.map(_.concat(mapping.column), (column) => {
                // get object key to get the value from `job` object
                const objectKey = _.compact([mapping.table, column]);

                // get value from `job` object
                return _.get(job, _.join(objectKey, '.'));
            });

            // assume there is no additional processing required
            let cellValue = _.first(values);

            // do additional processing if necessary
            if (mapping.fn) {
                cellValue = mapping.fn(...values);
            }

            // set value in cell
            const cell = worksheet.cell((rowNum + 2), (columnNum + 1));
            if (_.isString(cellValue)) {
                cell.string(cellValue);
            } else if (_.isNumber(cellValue)) {
                cell.number(cellValue);
            } else if (cellValue instanceof Date) {
                // https://github.com/natergj/excel4node/issues/155
                const withoutTimezone = moment(cellValue).utcOffset(TIMEZONE).format('YYYY-MM-DDTHH:mm:ss[Z]');
                cell.date(withoutTimezone);
            }
        });
    }

    function addPhotoToZip(folderName, job, photos) {
        const folder = zip.folder(folderName);
        photos = vrpUtils.toArray(photos);
        return Promise.each(photos, (photo, i) => {
            return folder.file(`${job.DeliveryMasterId}_${_.toLower(job.JobType)}_${i + 1}.${IMAGE_EXT}`, photo);
        });
    }

    /**
	 * Add white background to image
	 *
	 * @param {Buffer} imageBuffer  Image buffer
	 * @returns {Promise<buffer>}  todo
	 */
    function addWhiteBackground(imageBuffer) {
        if (_.isNil(imageBuffer)) {
            return Promise.resolve();
        }

        return Jimp.read(imageBuffer).then((image) => {
            return new Promise((resolve, reject) => {
                image
                    .rgba(false)
                    .background(0xFFFFFFFF)
                    .getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
                        if (_.isNil(err)) {
                            resolve(buffer);
                        } else {
                            reject(err);
                        }
                    });
            });
        });
    }
};

/**
 * Generate service chit
 *
 * @param {object} job  Instance from DeliveryDetail table
 * @param {buffer|string} podSignature  Proof of delivery (signature) either in buffer or base64
 * @returns {buffer}  Zip file
 */
exports.serviceChit = (job, podSignature) => {
    const fontDescriptors = new PdfPrinter({
        Roboto: {
            normal: `${__dirname}/fonts/Roboto-Regular.ttf`,
            bold: `${__dirname}/fonts/Roboto-Medium.ttf`,
            italics: `${__dirname}/fonts/Roboto-Italic.ttf`,
            bolditalics: `${__dirname}/fonts/Roboto-MediumItalic.ttf`,
        },
    });

    log.trace(`<ServiceChit> Id ${job.Id}, DeliveryMasterId ${job.DeliveryMasterId}`);

    if (JOB.isCompleted(job) === false) {
        return Promise.reject(`<ServiceChit> Job ${job.Id} is not completed.`);

    } else if (_.isNil(podSignature)) {
        return Promise.reject(`<ServiceChit> Job ${job.Id} POD signature is missing.`);

    }

    // convert signature into base64 if necessary
    let base64Signature = podSignature;
    if (Buffer.isBuffer(podSignature) === true) {
        base64Signature = vrpUtils.bufferToBase64(podSignature);
    }
    if (_.startsWith(base64Signature, 'data:image') === false) {
        base64Signature = `data:image/${IMAGE_EXT};base64,${base64Signature}`;
    }

    // PDF definition (refer to `pdfmake` library)
    const docDefinition = {
        footer: (page, pages) => ({
            columns: [{
                alignment: 'right',
                text: [
                    'page ',
                    {
                        text: page.toString(),
                        italics: true,
                    },
                    ' of ',
                    {
                        text: pages.toString(),
                        italics: true,
                    },
                ],
            }],
            fontSize: 8,
            margin: [20, 0],
        }),
        content: [{
            columns: [{
                width: 'auto',
                stack: [{
                    text: 'Company Logo here',
                    // image: '',
                    // fit: [120, 130],
                }],
            },
            [{
                text: 'Company Name here',
                style: 'pageHeader',
            },
            {
                text: [{
                    text: 'Company Address here',
                    style: 'pageSubheader',
                },
                {
                    text: '\nCompany Phone or Tax here',
                    style: 'pageSubheader',
                },
                {
                    text: '\nCompany Email here',
                    style: 'pageSubheader',
                },
                ],
            },
            ],
            ],
        }, {
            margin: [0, 20],
            table: {
                widths: ['*', '*', '*', '*'],
                body: [
                    [{
                        text: 'Date',
                        style: 'tableHeader',
                    }, {
                        text: moment(_.get(job, 'ActualDeliveryTime')).format(vrpEnum.DateFormat.DISPLAY_TEXT),
                        style: 'tableContent',
                        colSpan: 3,
                    }],
                    [{
                        text: 'Driver',
                        style: 'tableHeader',
                    }, {
                        text: getJobValue('DeliveryMaster.LastAttemptedByDriver'),
                        style: 'tableContent',
                        colSpan: 3,
                    }],
                    [{
                        text: 'Customer',
                        style: 'tableHeader',
                    }, {
                        text: getJobValue('DeliveryMaster.CustomerName'),
                        style: 'tableContent',
                        colSpan: 3,
                    }],
                    [{
                        text: 'Location',
                        style: 'tableHeader',
                    }, {
                        text: `${getJobValue('Address')}\n${getJobValue('Postal')}`,
                        style: 'tableContent',
                        colSpan: 3,
                    }],
                    [{
                        text: 'Type',
                        style: 'tableHeader',
                    }, {
                        text: getJobValue('JobType'),
                        style: 'tableContent',
                        colSpan: 3,
                    }],
                    [{
                        text: 'Items',
                        style: 'tableHeader',
                    }, {
                        ul: _.map(_.get(job, 'DeliveryItems'), (item) => {
                            const itemName = _.get(item, 'ItemId');
                            const qty = _.toNumber(_.get(item, 'ActualItemQty', 0));
                            return `Number of ${itemName}: ${qty}`;
                        }),
                        style: 'tableContent',
                        colSpan: 3,
                    }],
                    [{
                        text: 'Remarks',
                        style: 'tableHeader',
                    }, {
                        text: JOB.noteColumnToString(_.get(job, 'NoteFromDriver'), '\n'),
                        style: 'tableContent',
                        colSpan: 3,
                    }],
                    [{
                        text: 'Customer Signature',
                        style: 'tableHeader',
                    }, {
                        stack: [{
                            image: base64Signature,
                            fit: [90, 90],
                        }],
                        style: 'tableContent',
                        colSpan: 3,
                    }],
                ],
            },
            layout: {
                hLineWidth: (i, node) => {
                    return (i === 0 || i === node.table.body.length) ? 2 : 1;
                },
                vLineWidth: (i, node) => {
                    return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                },
                hLineColor: (i, node) => {
                    return (i === 0 || i === node.table.body.length) ? 'black' : '#3f3f3f';
                },
                vLineColor: (i, node) => {
                    return (i === 0 || i === node.table.widths.length) ? 'black' : '#3f3f3f';
                },
            },
        }],
        styles: {
            pageHeader: {
                fontSize: 16,
                bold: true,
                italics: true,
                alignment: 'right',
            },
            pageSubheader: {
                fontSize: 11,
                alignment: 'right',
                margin: [20, 30],
            },
            tableHeader: {
                margin: [5, 10],
                fontSize: 13,
                alignment: 'center',
                bold: true,
            },
            tableContent: {
                margin: [5, 10],
                fontSize: 13,
            },
        },
        defaultStyle: {
            fontSize: 11,
            columnGap: 20,
        },
    };

    return new Promise((resolve, reject) => {
        const pdfDoc = fontDescriptors.createPdfKitDocument(docDefinition);

        const chunks = [];
        pdfDoc.on('data', (chunk) => chunks.push(chunk));
        pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
        pdfDoc.on('error', (err) => reject(err));
        pdfDoc.end();
    });

    /**
	 * Get value from `job` object based on property key.
	 * If value is null or undefined, '-' will be returned.
	 * Lodash `_.get(obj, key, default)` cannot be used because default will not be used if obj[key]
	 * is null.
	 *
	 * @param {String} key  todo
	 * @returns {Object}  todo
	 */
    function getJobValue(key) {
        let value = _.get(job, key, '-');
        if (_.isNil(value)) {
            value = '-';
        }
        return value;
    }
};
