import { useSocket } from 'hooks/useSocket';
import * as React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const FormWrapper = styled(motion.div)`
  position: absolute;
  width: 215px;
`;

const Form = styled.form``;

const StyledInput = styled.textarea`
  padding: 0.2rem 0.2rem;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  color: ${p => p.theme.pink};
  font-size: 0.85rem;
  border: 2px solid ${p => p.theme.pink};
  /* outline-offset: -0.3rem; */
  padding: 0.6rem;
  font-family: Arial, Helvetica, sans-serif;
`;

const StyledButton = styled(motion.button)`
  height: 50px;
  width: 50px;
  background: ${p => p.theme.pink};
  border-radius: 100%;
  font-size: 2.4rem;
  color: ${p => p.theme.white};
`;

interface ButtonProps {
  setFormOpen: any;
  isFormOpen: boolean;
}

const Button = ({ setFormOpen, isFormOpen }: ButtonProps) => {
  return (
    <StyledButton
      type="button"
      animate={
        isFormOpen
          ? { rotate: 360, scale: 1.2, transition: { duration: 0.2 } }
          : { rotate: 0, scale: 1, transition: { duration: 0.4 } }
      }
      onClick={() => setFormOpen((state: boolean) => !state)}
    >
      {isFormOpen ? '-' : '+'}
    </StyledButton>
  );
};

const textareaRef = React.createRef<HTMLDivElement>();

export const Input = () => {
  const [message, setMessage] = React.useState('');
  const [isFormOpen, setFormOpen] = React.useState(
    process.env.NODE_ENV === 'development'
  );
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
    <div className="input-area" ref={textareaRef}>
      <AnimatePresence>
        {isFormOpen && (
          <FormWrapper
            animate={{ scaleX: 1.8, scaleY: 1.8, y: -130, x: -270 }}
            exit={{ scaleX: 0, scaleY: 0, y: -20, x: -15 }}
          >
            <Form onSubmit={handleSubmit}>
              <StyledInput
                name="message"
                cols={18}
                rows={6}
                onChange={e => setMessage(e.target.value)}
                value={message}
              />
            </Form>
          </FormWrapper>
        )}
      </AnimatePresence>
      <Button {...buttonProps} />
    </div>
  );
};
