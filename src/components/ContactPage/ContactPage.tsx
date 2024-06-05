import { useState } from 'react';
import { IconX, IconCheck } from '@tabler/icons-react';
import { Button, Notification } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import './ContactPage.scss';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowNotification(true);

    // Réinitialiser le formulaire
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    navigate('/');
  };

  return (
    <section className="contact-section">
      <div className="ContactPage">
        <h1 className="contact-title">Contactez-nous</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="nom-contact"
              id="name"
              name="name"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="email-contact"
              id="email"
              name="email"
              placeholder="Votre E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              id="message"
              className="message-contact"
              name="message"
              placeholder="Quel est votre message ?  :)"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-container-contact">
            <Button type="submit" color="bg" autoContrast>
              Envoyer
            </Button>
          </div>
        </form>
        {showNotification && (
          <>
            <div className="overlay" />
            <div className="notification-container">
              <Notification
                color="indigo"
                radius="xs"
                title="Message envoyé"
                icon={<IconCheck size={18} />}
                withBorder
                onClose={handleCloseNotification}
                closeButtonProps={{ icon: <IconX size={18} /> }}
              >
                Nous vous répondrons par e-mail dans les meilleurs délais.
              </Notification>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ContactPage;
