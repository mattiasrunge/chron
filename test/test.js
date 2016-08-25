"use strict";

const mocha = require("mocha");
const chai = require("chai");
const moment = require("moment");
const chron = require("../index");

chai.use(require("chai-datetime"));

const assert = chai.assert;

describe("Time", function() {
    describe("time2str", () => {
        // TODO:
    });

    describe("str2time", () => {
        it("should return false if shorter than 4 characters", function() {
            let str = "20";

            let time = chron.str2time(str);

            assert.equal(time, false);
        });

        it("should parse a year", function() {
            let str = "2016";

            let time = chron.str2time(str);

            assert.deepEqual(time, {
                year: "2016"
            });
        });

        it("should parse a year and month", function() {
            let str = "2016-06";

            let time = chron.str2time(str);

            assert.deepEqual(time, {
                year: "2016",
                month: "06"
            });
        });

        it("should parse a year, month and day", function() {
            let str = "2016-06-05";

            let time = chron.str2time(str);

            assert.deepEqual(time, {
                year: "2016",
                month: "06",
                day: "05"
            });
        });

        it("should parse a year, month, day and hour", function() {
            let str = "2016-06-05 20";

            let time = chron.str2time(str);

            assert.deepEqual(time, {
                year: "2016",
                month: "06",
                day: "05",
                hour: "20"
            });
        });

        it("should parse a year, month, day, hour and minute", function() {
            let str = "2016-06-05 20:34";

            let time = chron.str2time(str);

            assert.deepEqual(time, {
                year: "2016",
                month: "06",
                day: "05",
                hour: "20",
                minute: "34"
            });
        });

        it("should parse a year, month, day, hour, minute and second", function() {
            let str = "2016-06-05 20:34:54";

            let time = chron.str2time(str);

            assert.deepEqual(time, {
                year: "2016",
                month: "06",
                day: "05",
                hour: "20",
                minute: "34",
                second: "54"
            });
        });

        it("should parse a year, month, day, hour, minute, second and timezone", function() {
            let str = "2016-06-05 20:34:54+01:00";

            let time = chron.str2time(str);

            assert.deepEqual(time, {
                year: "2016",
                month: "06",
                day: "05",
                hour: "20",
                minute: "34",
                second: "54",
                timezone: "+01:00"
            });
        });

        it("should parse a year range", function() {
            let str = "2016|2017";

            let time = chron.str2time(str);

            assert.deepEqual(time, {
                year: [ "2016", "2017" ]
            });
        });

        it("should parse a month range", function() {
            let str = "2016-01|02";

            let time = chron.str2time(str);

            assert.deepEqual(time, {
                year: "2016",
                month: [ "01", "02" ]
            });
        });

        it("should parse a day range", function() {
            let str = "2016-01-03|04";

            let time = chron.str2time(str);

            assert.deepEqual(time, {
                year: "2016",
                month: "01",
                day: [ "03", "04" ]
            });
        });

        it("should parse a hour range", function() {
            let str = "2016-01-03 10|22";

            let time = chron.str2time(str);

            assert.deepEqual(time, {
                year: "2016",
                month: "01",
                day: "03",
                hour: [ "10", "22" ]
            });
        });

        it("should parse a minute range", function() {
            let str = "2016-01-03 10:44|46";

            let time = chron.str2time(str);

            assert.deepEqual(time, {
                year: "2016",
                month: "01",
                day: "03",
                hour: "10",
                minute: [ "44", "46" ]
            });
        });

        it("should parse a second range", function() {
            let str = "2016-01-03 10:44:23|51";

            let time = chron.str2time(str);

            assert.deepEqual(time, {
                year: "2016",
                month: "01",
                day: "03",
                hour: "10",
                minute: "44",
                second: [ "23", "51" ]
            });
        });
    });

    describe("Manual", () => {
        it("should compile manual time for a year source", function() {
            let sources = {
                manual: {
                    year: "2016"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2016-01-01T00:00:00Z");
        });

        it("should compile manual time for a year and month source", function() {
            let sources = {
                manual: {
                    year: "2015",
                    month: "06"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2015-06-01T00:00:00Z");
        });

        it("should compile manual time for a year, month and day source", function() {
            let sources = {
                manual: {
                    year: "2014",
                    month: "12",
                    day: "31"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2014-12-31T00:00:00Z");
        });

        it("should compile manual time for a year, month, day and hour source", function() {
            let sources = {
                manual: {
                    year: "2013",
                    month: "01",
                    day: "01",
                    hour: "12"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2013-01-01T12:00:00Z");
        });

        it("should compile manual time for a year, month, day, hour and minute source", function() {
            let sources = {
                manual: {
                    year: "2012",
                    month: "02",
                    day: "28",
                    hour: "23",
                    minute: "49"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2012-02-28T23:49:00Z");
        });

        it("should compile manual time for a year, month, day, hour, minute and second source", function() {
            let sources = {
                manual: {
                    year: "2011",
                    month: "11",
                    day: "03",
                    hour: "00",
                    minute: "00",
                    second: "37"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "local");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2011-11-03T00:00:37Z");
        });

        it("should compile manual time for a year, month, day, hour, minute and second in dst source", function() {
            let sources = {
                manual: {
                    year: "2011",
                    month: "06",
                    day: "03",
                    hour: "01",
                    minute: "00",
                    second: "37"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "local");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2011-06-03T00:00:37Z");
        });

        it("should compile manual time for a year, month, day, hour, minute, second and timezone without dst source", function() {
            let sources = {
                manual: {
                    year: "2010",
                    month: "01",
                    day: "02",
                    hour: "03",
                    minute: "04",
                    second: "05",
                    timezone: "+01:00"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "utc");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2010-01-02T02:04:05Z");
        });

        it("should compile manual time for a year, month, day, hour, minute, second and timezone with dst source", function() {
            let sources = {
                manual: {
                    year: "2009",
                    month: "06",
                    day: "02",
                    hour: "03",
                    minute: "04",
                    second: "05",
                    timezone: "+01:00"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "utc");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2009-06-02T01:04:05Z");
        });

        it("should compile manual time for a year, month, day, hour, minute, second and timezone #2 with dst source", function() {
            let sources = {
                manual: {
                    year: "2008",
                    month: "06",
                    day: "02",
                    hour: "03",
                    minute: "04",
                    second: "05",
                    timezone: "+02:30"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "utc");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2008-06-01T23:34:05Z");
        });

        it("should compile manual time for a year, month, day, hour, minute, second and timezone #3 with dst source", function() {
            let sources = {
                manual: {
                    year: "2007",
                    month: "06",
                    day: "02",
                    hour: "03",
                    minute: "04",
                    second: "05",
                    timezone: "-01:00"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "utc");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2007-06-02T03:04:05Z");
        });

        it("should compile manual time for a year, month, day, hour, minute, second and timezone #3 without dst source", function() {
            let sources = {
                manual: {
                    year: "2007",
                    month: "01",
                    day: "02",
                    hour: "03",
                    minute: "04",
                    second: "05",
                    timezone: "-01:00"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "utc");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2007-01-02T04:04:05Z");
        });
    });

    describe("Manual with ranges", () => {
        it("should compile manual time for a year source", function() {
            let sources = {
                manual: {
                    year: [ "2016", "2017" ]
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2016-01-01T00:00:00Z");
        });

        it("should compile manual time for a year and month source", function() {
            let sources = {
                manual: {
                    year: [ "2015", "2016" ],
                    month: [ "06", "07" ]
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2015-01-01T00:00:00Z");
        });

        it("should compile manual time for a year, month and day source", function() {
            let sources = {
                manual: {
                    year: "2014",
                    month: [ "11", "12" ],
                    day: [ "28", "31" ]
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2014-11-01T00:00:00Z");
        });

        it("should compile manual time for a year, month, day and hour source", function() {
            let sources = {
                manual: {
                    year: [ "2013", "2014" ],
                    month: [ "01", "06" ],
                    day: [ "01", "30" ],
                    hour: [ "12", "23" ]
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2013-01-01T00:00:00Z");
        });

        it("should compile manual time for a year, month, day, hour and minute source", function() {
            let sources = {
                manual: {
                    year: [ "2012", "2017" ],
                    month: [ "02", "12" ],
                    day: "28",
                    hour: "23",
                    minute: [ "49", "53" ]
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2012-01-01T00:00:00Z");
        });

        it("should compile manual time for a year, month, day, hour, minute and second source", function() {
            let sources = {
                manual: {
                    year: "2011",
                    month: "11",
                    day: [ "03", "06" ],
                    hour: "00",
                    minute: "00",
                    second: "37"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2011-11-03T00:00:00Z");
        });

        it("should compile manual time for a year, month, day, hour, minute and second in dst source", function() {
            let sources = {
                manual: {
                    year: "2011",
                    month: "06",
                    day: [ "03", "08" ],
                    hour: "01",
                    minute: "00",
                    second: "37"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2011-06-03T00:00:00Z");
        });

        it("should compile manual time for a year, month, day, hour, minute, second and timezone without dst source", function() {
            let sources = {
                manual: {
                    year: "2010",
                    month: [ "01", "07" ],
                    day: "02",
                    hour: "03",
                    minute: "04",
                    second: "05",
                    timezone: "+01:00"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2010-01-01T00:00:00Z");
        });

        it("should compile manual time for a year, month, day, hour, minute, second and timezone with dst source", function() {
            let sources = {
                manual: {
                    year: "2009",
                    month: "06",
                    day: "02",
                    hour: [ "03", "09" ],
                    minute: "04",
                    second: "05",
                    timezone: "+01:00"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2009-06-02T03:00:00Z");
        });

        it("should compile manual time for a year, month, day, hour, minute, second and timezone #2 with dst source", function() {
            let sources = {
                manual: {
                    year: "2008",
                    month: "06",
                    day: "02",
                    hour: [ "03", "12" ],
                    minute: "04",
                    second: [ "05", "09" ],
                    timezone: "+02:30"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2008-06-02T03:00:00Z");
        });

        it("should compile manual time for a year, month, day, hour, minute, second and timezone #3 with dst source", function() {
            let sources = {
                manual: {
                    year: "2007",
                    month: "06",
                    day: [ "02", "12" ],
                    hour: "03",
                    minute: "04",
                    second: "05",
                    timezone: "-01:00"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2007-06-02T00:00:00Z");
        });

        it("should compile manual time for a year, month, day, hour, minute, second and timezone #3 without dst source", function() {
            let sources = {
                manual: {
                    year: "2007",
                    month: "01",
                    day: "02",
                    hour: "03",
                    minute: "04",
                    second: [ "05", "59" ],
                    timezone: "-01:00"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.manual, type: "manual" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "manual");
            assert.equal(timestamp.quality, "fuzzy");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2007-01-02T03:04:05Z");
        });
    });

    describe("GPS", () => {
        it("should compile gps time for a year, month, day, hour, minute, second", function() {
            let sources = {
                gps: {
                    year: "2006",
                    month: "06",
                    day: "02",
                    hour: "06",
                    minute: "54",
                    second: "05",
                    timezone: "+00:00"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.gps, type: "gps" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type });

            assert.equal(timestamp.type, "gps");
            assert.equal(timestamp.quality, "utc");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2006-06-02T06:54:05Z");
        });
    });

    describe("Device type unknown", () => {
        it("should compile device time without DST", function() {
            let sources = {
                device: {
                    year: "2006",
                    month: "06",
                    day: "02",
                    hour: "06",
                    minute: "54",
                    second: "05",
                    deviceAutoDst: false,
                    deviceType: "unknown"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.device, type: "device" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type, deviceAutoDst: false });

            assert.equal(timestamp.type, "device");
            assert.equal(timestamp.quality, "local");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2006-06-02T06:54:05Z");
        });

        it("should compile device time with DST", function() {
            let sources = {
                device: {
                    year: "2006",
                    month: "06",
                    day: "02",
                    hour: "06",
                    minute: "54",
                    second: "05"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.device, type: "device" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type, deviceAutoDst: true });

            assert.equal(timestamp.type, "device");
            assert.equal(timestamp.quality, "local");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2006-06-02T05:54:05Z");
        });
    });

    describe("Device type offset_fixed", () => {
        it("should compile device time without DST in DST time frame", function() {
            let sources = {
                device: {
                    year: "2006",
                    month: "06",
                    day: "02",
                    hour: "06",
                    minute: "54",
                    second: "05"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.device, type: "device" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type, deviceAutoDst: false, deviceUtcOffset: 3600 });

            assert.equal(timestamp.type, "device");
            assert.equal(timestamp.quality, "utc");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2006-06-02T05:54:05Z");
        });

        it("should compile device time without DST outside DST timeframe", function() {
            let sources = {
                device: {
                    year: "2006",
                    month: "01",
                    day: "02",
                    hour: "06",
                    minute: "54",
                    second: "05"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.device, type: "device" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type, deviceAutoDst: false, deviceUtcOffset: 3600 });

            assert.equal(timestamp.type, "device");
            assert.equal(timestamp.quality, "utc");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2006-01-02T05:54:05Z");
        });

        it("should compile device time with DST in DST time frame", function() {
            let sources = {
                device: {
                    year: "2006",
                    month: "06",
                    day: "02",
                    hour: "06",
                    minute: "54",
                    second: "05"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.device, type: "device" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type, deviceAutoDst: true, deviceUtcOffset: 3600 * 2 });

            assert.equal(timestamp.type, "device");
            assert.equal(timestamp.quality, "utc");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2006-06-02T03:54:05Z");
        });

        it("should compile device time with DST outside DST timeframe", function() {
            let sources = {
                device: {
                    year: "2006",
                    month: "01",
                    day: "02",
                    hour: "06",
                    minute: "54",
                    second: "05"
                }
            };

            let item = chron.select(sources);

            assert.deepEqual(item, { time: sources.device, type: "device" });

            let timestamp = chron.time2timestamp(item.time, { type: item.type, deviceAutoDst: true, deviceUtcOffset: 3600 });

            assert.equal(timestamp.type, "device");
            assert.equal(timestamp.quality, "utc");
            assert.equal(moment.utc(timestamp.timestamp * 1000).format(), "2006-01-02T05:54:05Z");
        });
    });
});
