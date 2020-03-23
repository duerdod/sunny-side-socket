import { useSocket } from 'hooks/useSocket';
import * as React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Form = styled(motion.form)`
  position: absolute;
  bottom: 55px;
  right: 55px;
`;

const StyledInput = styled.textarea`
  padding: 0.2rem 0.2rem;
  width: 100%;
  height: 100%;
  border-radius: 1%;
  background: #f9f9f9;
  font-size: 1rem;
`;

const StyledButton = styled(motion.button)`
  height: 65px;
  width: 65px;
  margin: 1rem;
  background: #b0eacd;
  border-radius: 100%;
  position: absolute;
  bottom: 25px;
  right: 25px;
  font-size: 2.4rem;
`;

interface ButtonProps {
  setFormOpen: (state: boolean) => void;
  isFormOpen: boolean;
}

const Button = ({ setFormOpen, isFormOpen }: ButtonProps) => {
  return (
    <StyledButton
      type="button"
      animate={
        isFormOpen
          ? { rotate: 360 * 3, scale: 1.2, transition: { duration: 0.2 } }
          : { rotate: 0, scale: 1, transition: { duration: 0.4 } }
      }
      onClick={() => setFormOpen(!isFormOpen)}
    >
      {isFormOpen ? '-' : '+'}
    </StyledButton>
  );
};

const textareaRef = React.createRef<HTMLDivElement>();

export const Input = () => {
  const [message, setMessage] = React.useState('');
  const [isFormOpen, setFormOpen] = React.useState(false);
  const { emitMessage } = useSocket();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    emitMessage(message);
    setMessage('');
  }

  function resetForm() {
    setFormOpen(false);
    setMessage('');
  }

  React.useEffect(() => {
    textareaRef.current!.addEventListener('keydown', emitOnEnter);

    if (isFormOpen) {
      textareaRef.current?.querySelector('textarea')?.focus();
    }

    // TODO
    function emitOnEnter(e: any) {
      if (e.key === 'Enter') {
        e.preventDefault();
        emitMessage(message);
        resetForm();
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        resetForm();
      }
    }

    return () => {
      textareaRef.current!.removeEventListener('keydown', emitOnEnter);
    };
  }, [isFormOpen, message, emitMessage]);

  const buttonProps = { setFormOpen, isFormOpen };

  return (
    <div ref={textareaRef}>
      <AnimatePresence>
        {isFormOpen && (
          <Form
            onSubmit={handleSubmit}
            animate={{ scaleX: 1.8, scaleY: 1.8, y: -45, x: -83 }}
            exit={{ scaleX: 0, scaleY: 0, y: 25, x: 50 }}
          >
            <StyledInput
              name="message"
              cols={18}
              rows={6}
              onChange={e => setMessage(e.target.value)}
              value={message}
            />
          </Form>
        )}
      </AnimatePresence>
      <Button {...buttonProps} />
    </div>
  );
};
