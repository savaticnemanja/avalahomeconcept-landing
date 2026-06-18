'use client';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import { Bounce, toast } from 'react-toastify';
import { LuPhone, LuMessageSquare, LuMessageCircle, LuMail, LuSend } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';

export const Contact = ({ headingTag: Heading = 'h2' } = {}) => {
  const { t, href } = useI18n();
  const form = useRef();
  const router = useRouter();

  const contactMethods = [
    {
      icon: LuPhone,
      label: t('contact.methods.phone'),
      value: '+381 63 383 393',
      action: () => { window.location.href = 'tel:+38163383393'; },
    },
    {
      icon: LuMessageSquare,
      label: t('contact.methods.viber'),
      value: t('contact.methods.sendMessage'),
      action: () => window.open('viber://chat?number=%2B38163383393', '_blank'),
    },
    {
      icon: LuMessageCircle,
      label: t('contact.methods.whatsapp'),
      value: t('contact.methods.sendMessage'),
      action: () => window.open('https://wa.me/38163383393', '_blank'),
    },
    {
      icon: LuMail,
      label: t('contact.methods.email'),
      value: 'avalahomeconcept@gmail.com',
      action: () => { window.location.href = 'mailto:avalahomeconcept@gmail.com'; },
    },
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_479xn4w', 'template_f65leyq', form.current, 'yXqwmaxm-PpofwIqK')
      .then(
        () => router.push(href('/thank-you')),
        () => toast.error(t('contact.errorToast'), {
          position: 'bottom-center',
          autoClose: 5000,
          theme: 'light',
          transition: Bounce,
        })
      );
  };

  return (
    <section className="py-12 md:py-16 bg-[#F8F3EC]">
      <div className="safe-zone">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 xl:gap-24 items-start">

          <div className="flex flex-col gap-10" data-reveal>
            <div>
              <span className="overline"><LuMessageCircle />{t('contact.eyebrow')}</span>
              <Heading
                className="text-text"
                style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
              >
                {t('contact.titleA')}{' '}
                <em>{t('contact.titleEm')}</em>
              </Heading>
              <p className="text-text-muted font-light text-sm leading-relaxed mt-5 max-w-sm">
                {t('contact.availability')}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              {contactMethods.map(({ icon: Icon, label, value, action }, i) => (
                <button
                  key={i}
                  onClick={action}
                  className="flex items-center gap-5 py-4 border-b border-border text-left group hover:border-accent/40 transition-colors duration-150"
                >
                  <span className="w-10 h-10 flex items-center justify-center border border-border rounded-full text-text-muted group-hover:border-accent group-hover:text-accent-strong transition-all duration-200 flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <p
                      className="text-text-muted text-[0.68rem] font-medium tracking-[0.15em] uppercase mb-0.5"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {label}
                    </p>
                    <p className="text-text text-sm font-light underline decoration-1 underline-offset-4 decoration-border group-hover:text-accent-strong group-hover:decoration-accent transition-colors duration-150">
                      {value}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-0" data-reveal>
            <div className="border border-border p-4 md:p-8 flex flex-col gap-5 md:gap-7">

              <div className="flex flex-col gap-2">
                <h3
                  className="text-text"
                  style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 400 }}
                >
                  {t('contact.form.heading')}
                </h3>
                <p className="text-text-muted text-sm font-light leading-relaxed">
                  {t('contact.form.subheading')}
                </p>
              </div>

              {[
                { name: 'firstName',     type: 'text',  placeholder: t('contact.form.firstName') },
                { name: 'contactNumber', type: 'tel',   placeholder: t('contact.form.phone') },
                { name: 'contactEmail',  type: 'email', placeholder: t('contact.form.email') },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <input
                    {...field}
                    required
                    className="input peer"
                    placeholder=" "
                    id={field.name}
                  />
                  <label
                    htmlFor={field.name}
                    className="absolute left-0 top-3 text-text-muted text-sm font-light pointer-events-none transition-all duration-200 peer-focus:text-[0.7rem] peer-focus:-top-3 peer-focus:text-accent-strong peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-text-muted"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {field.placeholder}
                  </label>
                </div>
              ))}

              <div className="relative">
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder=" "
                  id="message"
                  className="input peer resize-none"
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-3 text-text-muted text-sm font-light pointer-events-none transition-all duration-200 peer-focus:text-[0.7rem] peer-focus:-top-3 peer-focus:text-accent-strong peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-text-muted"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {t('contact.form.message')}
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary group self-start mt-2"
              >
                <LuSend className="w-4 h-4" />
                {t('contact.form.send')}
                <span className="btn-arrow"><svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/></svg></span>
              </button>

            </div>
          </form>

        </div>
      </div>
    </section>
  );
};
