import { Button, MantineColor, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

function NewsletterSubscribeButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userEmail = event.currentTarget.email.value;
    setEmail('');
    close();
    notifications.show({
      title: 'Inscription réussie',
      message: `Vous recevrez bientôt les dernières actualités cinéma à l'adresse ${userEmail}`,
      color: 'green' as MantineColor,
    });
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Newsletter O'movies">
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}
        >
          <p>Recevez le meilleur de l'actualité cinéma !</p>
          <TextInput
            placeholder="votre.nom@email.fr"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="connection-input"
          />
          <Button type="submit" color="bg" autoContrast style={{ alignSelf: 'center' }}>
            Je m'inscris
          </Button>
        </form>
      </Modal>

      <Button variant="outline" color="bg" size="md" className="newsletter__button" onClick={open}>
        Newsletter
      </Button>
    </>
  );
}

export default NewsletterSubscribeButton;
