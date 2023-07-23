export const chartTheme = {
    'background': '#262523',
    'text': {
        'fontSize': 14,
        'fill': '#fcf7f7',
        'outlineWidth': 0,
        'outlineColor': 'transparent'
    },
    'axis': {
        'domain': {
            'line': {
                'stroke': '#777777',
                'strokeWidth': 1
            }
        },
        'legend': {
            'text': {
                'fontSize': 12,
                'fill': '#987c44',
                'outlineWidth': 0,
                'outlineColor': 'transparent'
            }
        },
        'ticks': {
            'line': {
                'stroke': '#777777',
                'strokeWidth': 1
            },
            'text': {
                'fontSize': 11,
                'fill': '#EDEDED',
                'outlineWidth': 0,
                'outlineColor': 'transparent'
            }
        }
    },
    'grid': {
        'line': {
            'stroke': '#dddddd',
            'strokeWidth': 1
        }
    },
    'legends': {
        'title': {
            'text': {
                'fontSize': 11,
                'fill': '#71716F',
                'outlineWidth': 0,
                'outlineColor': 'transparent'
            }
        },
        'text': {
            'fontSize': 11,
            'fill': '#EDEDED',
            'outlineWidth': 0,
            'outlineColor': 'transparent'
        },
        'ticks': {
            'line': {},
            'text': {
                'fontSize': 10,
                'fill': '#333333',
                'outlineWidth': 0,
                'outlineColor': 'transparent'
            }
        }
    },
    'annotations': {
        'text': {
            'fontSize': 13,
            'fill': '#333333',
            'outlineWidth': 2,
            'outlineColor': '#ffffff',
            'outlineOpacity': 1
        },
        'link': {
            'stroke': '#000000',
            'strokeWidth': 1,
            'outlineWidth': 2,
            'outlineColor': '#ffffff',
            'outlineOpacity': 1
        },
        'outline': {
            'stroke': '#000000',
            'strokeWidth': 2,
            'outlineWidth': 2,
            'outlineColor': '#ffffff',
            'outlineOpacity': 1
        },
        'symbol': {
            'fill': '#000000',
            'outlineWidth': 2,
            'outlineColor': '#ffffff',
            'outlineOpacity': 1
        }
    },
    'tooltip': {
        'container': {
            'background': '#ffffff',
            'fontSize': 12
        },
        'basic': {},
        'chip': {},
        'table': {},
        'tableCell': {},
        'tableCellValue': {}
    }
};


export const testData = [
    {
        'id': 'us',
        'color': 'hsl(200, 90%, 50%)',
        'data': [
            {
                'x': new Date('2023-01-02'),
                'y': 188
            },
            {
                'x': new Date('2023-02-03'),
                'y': 119
            },
            {
                'x': new Date('2023-03-04'),
                'y': 8
            },
            {
                'x': new Date('2023-04-05'),
                'y': 11
            },
            {
                'x': new Date('2023-05-06'),
                'y': 48
            },
            {
                'x': new Date('2023-06-07'),
                'y': 137
            },
            {
                'x': new Date('2023-07-08'),
                'y': 135
            },
            {
                'x': new Date('2023-08-09'),
                'y': 206
            },
            {
                'x': new Date('2023-09-10'),
                'y': 245
            }


        ]
    }
];