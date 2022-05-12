module.exports = {
    "table1": {
        'headKey': {
            'id': { type: 'input', name: 'ID', width: 79 },
            'name': { type: 'input', name: 'Name' },
            'by type': {
                type: 'select',
                name: 'By type',
                options: [
                    { label: 'Fit', id: 1, bgc: '#d1f7c4' },
                    { label: 'Yoga', id: 2 },
                    { label: 'Face yoga', id: 3 },
                ]
            },
            'by fit type': {
                type: 'selects',
                name: 'By fit type',
                options: [
                    { label: 'Cardio', id: 1, bgc: '#c2f5e9' },
                    { label: 'Warmup', id: 2, bgc: '#d1f7c4' },
                    { label: 'Cooldown', id: 3, bgc: '#ede2fe' },
                    { label: 'Stretch', id: 4, bgc: '#ede2fe' },
                ]
            },
            'molly': {
                type: "checkbox",
                name: 'Molly(1)'
            }
        },
        "tableData": [
            {}
            // { id: 1, name: 'this is test1', 'by fit type': "1" },
            // { id: 2, name: 'this is test2', 'by type': 2, 'by fit type': "1,2" },
            // { id: 3, name: 'this is test3', 'by fit type': "1,2,3" },
            // { id: 4, name: 'this is test4' },
            // { id: 5, name: 'this is test5' },
            // { id: 6, name: 'this is test6' },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
            // { name: 'this is test312', },
        ]
    }
}