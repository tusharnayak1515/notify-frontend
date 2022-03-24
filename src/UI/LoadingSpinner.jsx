import React from 'react';

import Loading_Spinner from './loadingspinner3.gif';

import styles from './loadingSpinner.module.css';

const LoadingSpinner = () => {
    return (
        <div className={styles.loading}>
            <img src={Loading_Spinner} alt="" />
        </div>
    )
}

export default LoadingSpinner;
