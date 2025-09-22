import React, { useState } from 'react';
import { useSiteMutate } from '../hooks/useSiteMutate';
import { SiteData } from '../types/SiteData';
import './CreateSiteModal.css'; // Vamos criar um CSS para ele

interface CreateSiteModalProps {
  onClose: () => void;
} 

const CreateSiteModal: React.FC<CreateSiteModalProps> = ({ onClose }) => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const { mutate, isPending } = useSiteMutate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newSite: SiteData = { nome, endereco };
    mutate(newSite, {
      onSuccess: () => {
        onClose(); // Fecha o modal em caso de sucesso
      }
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Cadastrar Novo Site</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome do Site:</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Endereço:</label>
            <input value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} disabled={isPending}>Cancelar</button>
            <button type="submit" disabled={isPending}>
              {isPending ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSiteModal;