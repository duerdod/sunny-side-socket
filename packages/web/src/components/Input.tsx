import * as React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocketMessage } from 'hooks/useSocketMessage';

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
  padding: 0.6rem;
  font-family: Arial, Helvetica, sans-serif;
  resize: none;
  font-size: 0.85rem;
  z-index: 999;

  @media screen and (max-width: 40em) {
    font-size: 16px;
  }
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
  setFormOpen: (state: React.SetStateAction<boolean>) => void;
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
      onClick={e => {
        e.preventDefault();
        setFormOpen(state => !state);
      }}
    >
      {isFormOpen ? '-' : '+'}
    </StyledButton>
  );
};

const textareaRef = React.createRef<HTMLDivElement>();

export const Input = () => {
  const [message, setMessage] = React.useState('');
  const [isFormOpen, setFormOpen] = React.useState(true);
  const { sendMessage } = useSocketMessage();

  function resetForm() {
    setFormOpen(false);
    setMessage('');
  }

  // TODO: SEP.
  React.useEffect(() => {
    textareaRef.current!.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleMouseDown);

    if (isFormOpen) {
      textareaRef.current?.querySelector('textarea')?.focus();
    }

    // TODO: TYPES?!
    function handleKeyDown(e: any) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage(message);
        resetForm();
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        resetForm();
      }
    }

    function handleMouseDown(e: any) {
      if (
        document.body.contains(e.target) &&
        !textareaRef.current?.contains(e.target)
      ) {
        setFormOpen(false);
      }
    }

    return () => {
      textareaRef.current!.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleMouseDown);
    };
  }, [isFormOpen, message, sendMessage]);

  const buttonProps = { setFormOpen, isFormOpen };

  return (
    <div className="input-area" ref={textareaRef}>
      <AnimatePresence>
        {isFormOpen && (
          <FormWrapper
            animate={{ y: -120, x: -195 }}
            exit={{ y: -50, x: -100, scale: 0 }}
          >
            <Form>
              <StyledInput
                name="message"
                cols={18}
                rows={6}
                maxLength={240}
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
