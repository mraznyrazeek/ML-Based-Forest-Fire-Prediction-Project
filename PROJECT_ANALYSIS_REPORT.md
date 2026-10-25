# Forest Fire Prediction Project — Analysis Report

**Reviewed:** 13 October 2026  
**Scope:** Source files, notebook code and recorded outputs, CSV data, saved artifact metadata, and local Git records. No training, notebook execution, or saved-model loading was performed. Reported model scores are historical notebook results.

## Main conclusion

You can continue developing a Flask prototype without recovering the missing 8 GB raw dataset. The extracted CSV, processed training/testing data, trained models, and most preprocessing information are present. You do not need to repeat all previous machine learning work.

The current models estimate **burned area for a fire event**, not the probability that a fire will occur. Runtime prediction readiness still needs verification.

## Project structure

| Location | Contents |
|---|---|
| `backend/data extraction/` | Six Python scripts for raw-data inspection, unit checks, CSV extraction, validation, and initial analysis |
| `backend/notebooks/` | Six notebooks covering investigation, preprocessing, training, evaluation/explainability, model improvement, and proposed dataset enhancement |
| `dataset/` | Extracted wildfire CSV and processed datasets |
| `models/` | Three trained model files and feature/ensemble metadata |

There is currently no Flask application, reusable inference module, or dependency manifest.

**Workflow:** Raw NetCDF samples → extracted CSV → cleaning and feature engineering → processed train/test data → model training/evaluation → saved models → future Flask application.

## Available data and artifacts

| Item | Finding |
|---|---|
| Raw MESOGEOS dataset | Missing; excluded by `.gitignore` |
| Extracted CSV | 11,305 rows and 32 columns; two duplicate rows |
| Processed training data | 9,042 rows and 44 features |
| Processed testing data | 2,261 rows and 44 features |
| Processed features | No missing or nonfinite values; column order matches the saved feature list |
| Targets | Present; use `log1p(burned_area_ha)` |
| General median imputer | Saved in `dataset/processed/median_imputer.pkl` |
| Random Forest model | Present; approximately 140 MiB |
| HistGradientBoosting model | Present; approximately 405 KiB |
| Optimized XGBoost model | Present; approximately 3.3 MiB |
| Model metadata | Ensemble weights, feature metadata, and XGBoost feature list are present |

The extracted CSV covers April 2006–September 2022. Recorded burned areas range from 30 to 107,602 hectares. Actual model binaries are present locally, rather than only Git LFS placeholders. Their existence does not yet confirm successful loading or prediction in the current environment.

## Dependencies identified

NumPy, pandas, xarray, scikit-learn, XGBoost, Optuna, joblib, SHAP, Matplotlib, and seaborn. Notebook execution needs a Jupyter-compatible environment; raw NetCDF access needs an appropriate xarray backend.

Historical metadata records Python 3.13.5, scikit-learn 1.9.0, XGBoost 3.4.0, and Optuna 4.9.0. These are not checks of currently installed packages. No dependency lockfile was found.

## Main issues

1. **Incomplete deployment preprocessing:** The wind-direction sine/cosine imputer is fitted in notebook 02 but not saved. Its fill values can be recovered from existing processed training rows. Missingness flags, date cycles, wind conversion, units, and feature order must also be reproduced consistently.
2. **Limited model performance:** Recorded test R² on the log target is 0.2302 for the ensemble and 0.2475 for optimized XGBoost. XGBoost's recorded hectare-scale R² is 0.0363, with MAE around 350 hectares. Large fires are substantially underestimated. These results support a research prototype, not a claim of reliable operational forecasting.
3. **Evaluation limitations:** Random splits do not establish performance on future years or new regions. Repeated test-set comparisons weaken its independence. Preprocessing is fitted before cross-validation rather than separately within each fold.
4. **Input requirements:** The model needs 44 prepared features, including vegetation, terrain, location, and land-cover information. A few weather inputs alone do not reproduce the training setup.
5. **Portability:** Some notebooks use hard-coded Windows paths; others depend on the working directory. The README contains only a title.
6. **Unfinished enhancement:** Notebook 06 explores historical features but does not implement a completed enhanced pipeline. Its recorded raw sample has only one time step, so recovering those samples alone may not supply multi-day weather histories.
7. **Extraction overwrite risk:** The CSV extraction script does not guard against saving an empty result when raw files are absent. Do not rerun it with the raw directory missing.
8. **Not all experiments are exported:** Other classifiers and regression variants remain notebook experiments rather than saved deployment models.

## Is the missing dataset needed?

| Activity | Need the missing raw dataset? |
|---|---|
| Build Flask around existing models | No |
| Predict from correctly prepared inputs | No |
| Evaluate using saved test data | No |
| Retrain the existing feature approach | No; extracted and processed data remain available |
| Recreate or audit original extraction | Yes |
| Extract additional raw features | Possibly |
| Build historical weather features | Suitable historical data is required; the missing samples may not be sufficient |

## Git preservation

The latest inspected local commit, `67f6b90` (`Saved optimized XGBOOST Model`), includes the Python scripts, notebooks, extracted CSV, processed training/testing data, median imputer, and feature definitions.

The six files in `models/` are recorded through Git LFS. Git stores references to those files; their actual binaries are present in the local working folder. **Successful upload of the LFS objects to the remote repository has not been verified.** The missing raw dataset is not tracked.

## Next steps before serving predictions

1. Select the saved model to serve and label the application as burned-area estimation.
2. Package the complete preprocessing logic, including missing wind-direction handling.
3. Define compatible dependencies and verify that the saved model loads.
4. Check predictions against known test examples and apply `expm1` to return hectares.
5. Define the input fields, units, data sources, and validation for Flask.

**Readiness:** Ready to begin a Flask research prototype. End-to-end inference and remote backup completeness remain unverified. Recovery of the raw dataset can wait while these deployment tasks are completed.
