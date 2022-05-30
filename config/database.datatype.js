const { DataTypes, Utils } = require('sequelize');

const ABSTRACT = DataTypes.ABSTRACT.prototype.constructor;

class STRINGARRAY extends ABSTRACT {

    static key = 'STRINGARRAY';

    toSql() {
        return 'LONGTEXT';
    }

    validate(value, options) {
        return typeof value === 'string';
    }

    /**
     *
     * @param {array<string>} value
     * @returns {string}
     * @private
     */
    _stringify(value) {
        return value.join(',');
    }

    /**
     *
     * @param {string} value
     * @returns {array<string>}
     */
    static parse(value) {
        return value.split(',');
    }

}

DataTypes.STRINGARRAY = Utils.classToInvokable(STRINGARRAY);