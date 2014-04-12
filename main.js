'use strict';

function Root() {
    var types = [
        'normal',
        'fighting',
        'flying',
        'poison',
        'ground',
        'rock',
        'bug',
        'ghost',
        'steel',

        'fire',
        'water',
        'grass',
        'electric',
        'psychic',
        'ice',
        'dragon',
        'dark',
        'fairy',
    ];

    var rawData = [
        '1× 1× 1× 1× 1× ½× 1× 0× ½× 1× 1× 1× 1× 1× 1× 1× 1× 1×',
        '2× 1× ½× ½× 1× 2× ½× 0× 2× 1× 1× 1× 1× ½× 2× 1× 2× ½×',
        '1× 2× 1× 1× 1× ½× 2× 1× ½× 1× 1× 2× ½× 1× 1× 1× 1× 1×',
        '1× 1× 1× ½× ½× ½× 1× ½× 0× 1× 1× 2× 1× 1× 1× 1× 1× 2×',
        '1× 1× 0× 2× 1× 2× ½× 1× 2× 2× 1× ½× 2× 1× 1× 1× 1× 1×',
        '1× ½× 2× 1× ½× 1× 2× 1× ½× 2× 1× 1× 1× 1× 2× 1× 1× 1×',
        '1× ½× ½× ½× 1× 1× 1× ½× ½× ½× 1× 2× 1× 2× 1× 1× 2× ½×',
        '0× 1× 1× 1× 1× 1× 1× 2× 1× 1× 1× 1× 1× 2× 1× 1× ½× 1×',
        '1× 1× 1× 1× 1× 2× 1× 1× ½× ½× ½× 1× ½× 1× 2× 1× 1× 2×',
        '1× 1× 1× 1× 1× ½× 2× 1× 2× ½× ½× 2× 1× 1× 2× ½× 1× 1×',
        '1× 1× 1× 1× 2× 2× 1× 1× 1× 2× ½× ½× 1× 1× 1× ½× 1× 1×',
        '1× 1× ½× ½× 2× 2× ½× 1× ½× ½× 2× ½× 1× 1× 1× ½× 1× 1×',
        '1× 1× 2× 1× 0× 1× 1× 1× 1× 1× 2× ½× ½× 1× 1× ½× 1× 1×',
        '1× 2× 1× 2× 1× 1× 1× 1× ½× 1× 1× 1× 1× ½× 1× 1× 0× 1×',
        '1× 1× 2× 1× 2× 1× 1× 1× ½× ½× ½× 2× 1× 1× ½× 2× 1× 1×',
        '1× 1× 1× 1× 1× 1× 1× 1× ½× 1× 1× 1× 1× 1× 1× 2× 1× 0×',
        '1× ½× 1× 1× 1× 1× 1× 2× 1× 1× 1× 1× 1× 2× 1× 1× ½× ½×',
        '1× 2× 1× ½× 1× 1× 1× 1× ½× ½× 1× 1× 1× 1× 1× 2× 2× 1×',
    ].map(function(row) { return row.split(' ') });

    var rawDataStrToNumber = function(str) {
        if (str === '2×') return   2;
        if (str === '1×') return   1;
        if (str === '½×') return 0.5;
        if (str === '0×') return   0;

        throw new Error();
    };

    var table = _.reduce(rawData, function(tab, row, i) {
        tab[types[i]] = _.reduce(row, function(r, data, j) {
            r[types[j]] = rawDataStrToNumber(data);
            return r;
        }, {});
        return tab;
    }, {});

    var matchupFor = function(ta1, ta2, tb) {
        var x1 = table[tb][ta1];
        var x2 = 1;

        // Don't allow bogus type combinations, such as Fire/Fire or Fire/None
        if (ta1 !== ta2 && ta2 !== 'none') {
            x2 = table[tb][ta2];
        }

        var x3 = x1 * x2;
        if (x3 === 4.00) return 'doubleSuper';
        if (x3 === 2.00) return 'super';
        if (x3 === 1.00) return 'normal';
        if (x3 === 0.50) return 'weak';
        if (x3 === 0.25) return 'doubleWeak';
        if (x3 === 0.00) return 'immune';
    };

    var typesOrNone = types.concat('none');

    var type1 = ko.observable('normal');
    var type2 = ko.observable('none');

    var canonicalizeDualTypes = function() {
        if (type1() === type2()) {
            type2('none');
        }
    };

    type1.subscribe(canonicalizeDualTypes);
    type2.subscribe(canonicalizeDualTypes);

    var classForType1 = function(type) {
        return (type === type1() ? 'selected ' : '') + type;
    };

    var classForType2 = function(type) {
        return (type === type2() ? 'selected ' : '') + type;
    };

    var matchups = ko.computed(function() {
        var t1 = type1();
        var t2 = type2();

        var allMatchups = _.reduce(types, function(h, t, i) {
            h[t] = matchupFor(t1, t2, t);
            return h;
        }, {});

        // Group by effectiveness
        return _.groupBy(_.pairs(allMatchups), 1);
    });

    return {
        typesOrNone: typesOrNone,
        types: types,

        type1: type1,
        type2: type2,

        classForType1: classForType1,
        classForType2: classForType2,

        matchups: matchups,
    };
}

var $root = Root();

ko.applyBindings($root);
