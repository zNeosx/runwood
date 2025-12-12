'use client';
import { sendContactEmail } from '@/app/actions/send-contact-email.action';
import { Send } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '../ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    };

    const result = await sendContactEmail(data);

    if (result.success) {
      toast.success('Message envoyé ! Nous vous répondrons dans les 24h.');
      form.reset();
    } else {
      toast.error(result.error);
    }

    setIsLoading(false);
  };

  return (
    <Card className="p-8 animate-slide-up">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="data-[variant=legend]:text-3xl font-bold text-primary mb-6">
              Envoyez-nous un message
            </FieldLegend>
            <Field>
              <FieldLabel htmlFor="name">Nom*</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Jean DOE"
                className="bg-input/30"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Adresse e-mail*</FieldLabel>
              <Input
                id="email"
                name="email"
                placeholder="jean@example.com"
                className="bg-input/30"
                type="email"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">Téléphone*</FieldLabel>
              <Input
                id="phone"
                name="phone"
                placeholder="0692010203"
                className="bg-input/30"
                type="tel"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="message">Message*</FieldLabel>
              <Textarea
                id="message"
                name="message"
                placeholder="Décrivez votre projet ou votre question..."
                className="bg-input/30"
                required
              />
            </Field>
            <Field>
              <Button type="submit" isLoading={isLoading}>
                <Send className="mr-2 h-5 w-5" />
                Envoyer le message
              </Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </Card>
  );
};

export default ContactForm;
