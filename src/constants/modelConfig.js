/**
 * Model Configuration
 * Centralized model type definitions and display name mappings
 */

// Model types
export const MODEL_TYPES = {
    NORMAL: 'normal',
    SMOTE: 'smote',
    BACKTRANSLATION: 'bt'
};

// Model display names
export const MODEL_DISPLAY_NAMES = {
    [MODEL_TYPES.NORMAL]: 'Baseline',
    [MODEL_TYPES.SMOTE]: 'Augmentasi SMOTE',
    [MODEL_TYPES.BACKTRANSLATION]: 'Back-translation'
};

// Short model names for tabs
export const MODEL_SHORT_NAMES = {
    [MODEL_TYPES.NORMAL]: 'Baseline',
    [MODEL_TYPES.SMOTE]: 'SMOTE',
    [MODEL_TYPES.BACKTRANSLATION]: 'Back-translation'
};

/**
 * Get display name for a model type
 * @param {string} modelType - Model type key
 * @returns {string} Display name
 */
export const getModelDisplayName = (modelType) => {
    return MODEL_DISPLAY_NAMES[modelType] || modelType;
};

/**
 * Get short name for a model type
 * @param {string} modelType - Model type key
 * @returns {string} Short name
 */
export const getModelShortName = (modelType) => {
    return MODEL_SHORT_NAMES[modelType] || modelType;
};
