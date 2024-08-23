import React from 'react'
import styles from './DeleteItem.module.css'

const DeleteItem = ({ quizId, onClose, onConfirm }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Are you confirm you<br/> want to delete ?</h2>
                <div className={styles.modalActions}>
                    <button className={styles.confirmButton} onClick={() => onConfirm(quizId)}>Confirm Delete</button>
                    <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteItem
