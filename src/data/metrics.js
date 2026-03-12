// Data dari hasil eksperimen notebook

export const MODELS = {
    normal: {
        id: 'normal',
        name: 'Normal (Baseline)',
        description: 'Model dasar tanpa teknik balancing',
        accuracy: 73.07,
        precision: 75.0,
        recall: 73.0,
        f1Score: 70.21,
        cvAccuracy: 71.63,
        cvF1Score: 68.73,
        nGram: '(1, 2)',
        trainSamples: 2718,
        testSamples: 1166,
        perClass: {
            negatif: { precision: 70.48, recall: 93.63, f1: 80.42, support: 612 },
            netral: { precision: 87.10, recall: 18.62, f1: 30.68, support: 145 },
            positif: { precision: 78.26, recall: 61.61, f1: 68.95, support: 409 }
        },
        confusionMatrix: [
            [573, 14, 25],
            [82, 27, 36],
            [158, 1, 250]
        ],
        isBinary: false
    },
    smote: {
        id: 'smote',
        name: 'SMOTE',
        description: 'Synthetic Minority Over-sampling Technique',
        accuracy: 70.93,
        precision: 73.07,
        recall: 70.93,
        f1Score: 71.48,
        cvAccuracy: 79.98,
        cvF1Score: 79.73,
        nGram: '(1, 2)',
        trainSamples: 4281,
        testSamples: 1166,
        syntheticSamples: 1563,
        perClass: {
            negatif: { precision: 78.14, recall: 78.27, f1: 78.20, support: 612 },
            netral: { precision: 42.47, recall: 64.14, f1: 51.10, support: 145 },
            positif: { precision: 76.35, recall: 62.35, f1: 68.64, support: 409 }
        },
        confusionMatrix: [
            [479, 98, 35],
            [27, 93, 25],
            [107, 48, 254]
        ],
        isBinary: false
    },
    backstranslation: {
        id: 'backstranslation',
        name: 'Back-translation',
        description: 'Augmentasi data dengan terjemahan bolak-balik ID↔Prancis',
        accuracy: 71.61,
        precision: 71.0,
        recall: 72.0,
        f1Score: 71.20,
        cvAccuracy: 79.84,
        cvF1Score: 79.74,
        nGram: '(1, 3)',
        trainSamples: 4281,
        testSamples: 1166,
        syntheticSamples: 1563,
        perClass: {
            negatif: { precision: 74.93, recall: 82.03, f1: 78.32, support: 612 },
            netral: { precision: 50.00, recall: 43.45, f1: 46.49, support: 145 },
            positif: { precision: 72.97, recall: 66.01, f1: 69.32, support: 409 }
        },
        confusionMatrix: [
            [502, 57, 53],
            [52, 63, 30],
            [116, 23, 270]
        ],
        isBinary: false
    }
};

export const DATASET_INFO = {
    totalSamples: 3884,
    labels: ['Negatif', 'Netral', 'Positif'],
    distribution: {
        negatif: { count: 2039, percentage: 52.5 },
        netral: { count: 482, percentage: 12.4 },
        positif: { count: 1363, percentage: 35.1 }
    },
    trainTestSplit: { train: 70, test: 30 },
    features: 5000
};

export const COMPARATIVE_METRICS = [
    { name: 'Normal', accuracy: 73.07, precision: 75.0, recall: 73.0, f1: 70.21 },
    { name: 'SMOTE', accuracy: 70.93, precision: 73.07, recall: 70.93, f1: 71.48 },
    { name: 'Back-translation', accuracy: 71.61, precision: 71.0, recall: 72.0, f1: 71.20 }
];

export const F1_PER_CLASS = [
    { name: 'Negatif', Normal: 80.42, SMOTE: 78.20, Backstranslation: 78.32 },
    { name: 'Netral', Normal: 30.68, SMOTE: 51.10, Backstranslation: 46.49 },
    { name: 'Positif', Normal: 68.95, SMOTE: 68.64, Backstranslation: 69.32 }
];

export const CV_VS_TEST = [
    { name: 'Normal', cv: 71.63, test: 73.07 },
    { name: 'SMOTE', cv: 79.98, test: 70.93 },
    { name: 'Back-translation', cv: 79.84, test: 71.61 }
];

// Classification Report Data for Heatmap
export const CLASSIFICATION_REPORT_DATA = {
    normal: {
        name: 'Normal (Baseline)',
        classes: [
            { label: 'Negatif', precision: 0.704797, recall: 0.936275, f1Score: 0.804211 },
            { label: 'Netral', precision: 0.870968, recall: 0.186207, f1Score: 0.306818 },
            { label: 'Positif', precision: 0.782609, recall: 0.616137, f1Score: 0.689466 }
        ]
    },
    smote: {
        name: 'SMOTE',
        classes: [
            { label: 'Negatif', precision: 0.781403, recall: 0.782680, f1Score: 0.782041 },
            { label: 'Netral', precision: 0.424658, recall: 0.641379, f1Score: 0.510989 },
            { label: 'Positif', precision: 0.763473, recall: 0.623472, f1Score: 0.686406 }
        ]
    },
    backstranslation: {
        name: 'Back-translation',
        classes: [
            { label: 'Negatif', precision: 0.749254, recall: 0.820261, f1Score: 0.783151 },
            { label: 'Netral', precision: 0.500000, recall: 0.434483, f1Score: 0.464945 },
            { label: 'Positif', precision: 0.729730, recall: 0.660147, f1Score: 0.693196 }
        ]
    }
};
