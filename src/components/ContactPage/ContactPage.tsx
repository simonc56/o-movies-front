import { ChangeEvent, useState } from 'react';
import './ContactPage.scss';


function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // api ?!

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section className="contact-section">
    <div className="ContactPage">
      <h1 className= "contact-title" >Contactez-nous</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Votre nom :</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Votre E-mail :</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Quel est votre message :</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
        </div>
        <button className="contact-button" 
        type="submit">Envoyer</button>
      </form>
    </div>
     </section>
  );
}

export default ContactPage;