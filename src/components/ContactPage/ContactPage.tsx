import { useState } from 'react';
import './ContactPage.scss';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // api ?!

    setFormData({
      name: '',
      email: '',
      message: '',
    });
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
          <button type="submit">
            Envoyer
          </button>
          </div>
        </form>
        <p className="info-contact">Nous vous répondrons par e-mail dans les meilleurs délais.</p>
      </div>
    </section>
  );
}
export default ContactPage;
