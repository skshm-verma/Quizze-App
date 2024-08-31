import React from 'react'
import toast from 'react-hot-toast';
import { IoHomeOutline } from "react-icons/io5";
import styles from './ShareQuiz.module.css';

const ShareQuiz = ({ quizId, showLastComponent }) => {

    const handleCopyQuizLink = async () => {
        const url = `https://quizze-the-create-quiz-app.vercel.app/quiz/${quizId}`;
        try {
            await navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard!'); // Show success toast notification
        } catch (error) {
            toast.error('Failed to copy link'); // Show error toast notification if copying fails
        }
    }

    return (
        <div className={styles.shareQuizContainer}>
            <span onClick={showLastComponent}><IoHomeOutline className={styles.homeImg} /></span>
            <h1>Congrats your Quiz is<br /> Published!</h1>
            <div>
                <p>your link is here</p>
            </div>
            <button onClick={handleCopyQuizLink}>Share</button>
        </div>
    )
}

export default ShareQuiz
