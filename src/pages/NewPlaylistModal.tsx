import React, { useState } from 'react';
import styles from '../spotify.module.css';
import buttonNewList from "../assets/button_criar.png";
import buttonx from "../assets/x.png";

interface NewPlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreatePlaylist: (name: string, description: string) => void;
}

const NewPlaylistModal: React.FC<NewPlaylistModalProps> = ({ isOpen, onClose, onCreatePlaylist }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onCreatePlaylist(name, description);
            setName('');
            setDescription('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                    <div className={styles.modalActionsX}>
                        <img src={buttonx} alt="Descrição da imagem" onClick={onClose} />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="playlistName">Dê um nome a sua playlist</label>
                        <input
                            id="playlistName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Minha Playlist"
                            required
                            autoFocus
                        />
                    </div>

                    <div className={styles.modalActions}>
                        <img src={buttonNewList} alt="Descrição da imagem" onClick={handleSubmit} />
                    </div>

            </div>
        </div>
    );
};

export default NewPlaylistModal;
