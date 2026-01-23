/**
 * API Client
 * Centralized API communication logic
 */

import { getModelDisplayName } from '../constants/modelConfig';

// API Configuration
const API_BASE_URL = 'http://localhost:5000';
const API_ENDPOINTS = {
    PREDICT: '/predict',
    PREDICT_ALL: '/predict_all'
};

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
    constructor(message, statusCode, data) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.data = data;
    }
}

/**
 * Predict sentiment for given text using specified model
 * @param {string} text - Text to analyze
 * @param {string} modelType - Model type to use
 * @returns {Promise<Object>} Prediction result
 * @throws {ApiError} If API request fails
 */
export const predictSentiment = async (text, modelType) => {
    if (!text || text.trim() === '') {
        throw new Error('Text cannot be empty');
    }

    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PREDICT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text.trim(),
                model: modelType
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new ApiError(
                data.error || 'API request failed',
                response.status,
                data
            );
        }

        // Return normalized result
        return {
            sentiment: data.sentiment,
            confidence: data.confidence,
            model: getModelDisplayName(modelType),
            probabilities: data.probabilities || {
                Negatif: 0,
                Netral: 0,
                Positif: 0
            }
        };

    } catch (error) {
        // Network error or fetch failed
        if (error instanceof ApiError) {
            throw error;
        }

        // Handle network errors
        throw new ApiError(
            'Server tidak aktif atau tidak dapat dijangkau',
            0,
            { originalError: error.message }
        );
    }
};

/**
 * Predict sentiment using all 4 experiment models
 * @param {string} text - Text to analyze
 * @returns {Promise<Object>} Prediction results from all models
 * @throws {ApiError} If API request fails
 */
export const predictAllModels = async (text) => {
    if (!text || text.trim() === '') {
        throw new Error('Text cannot be empty');
    }

    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PREDICT_ALL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text.trim()
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new ApiError(
                data.error || 'API request failed',
                response.status,
                data
            );
        }

        // Normalize results for each model
        const normalizedResults = {};
        for (const [modelType, result] of Object.entries(data.results)) {
            normalizedResults[modelType] = {
                sentiment: result.sentiment,
                confidence: result.confidence,
                model: getModelDisplayName(modelType),
                modelDescription: result.model_description,
                probabilities: result.probabilities || {
                    Negatif: 0,
                    Netral: 0,
                    Positif: 0
                }
            };
        }

        return {
            text: data.text,
            cleanedText: data.cleaned_text,
            results: normalizedResults
        };

    } catch (error) {
        // Network error or fetch failed
        if (error instanceof ApiError) {
            throw error;
        }

        // Handle network errors
        throw new ApiError(
            'Server tidak aktif atau tidak dapat dijangkau',
            0,
            { originalError: error.message }
        );
    }
};

/**
 * Create error result object for display
 * @param {string} message - Error message
 * @returns {Object} Error result object
 */
export const createErrorResult = (message) => {
    return {
        sentiment: 'Error',
        confidence: '0',
        model: message,
        probabilities: {
            Negatif: 0,
            Netral: 0,
            Positif: 0
        }
    };
};
