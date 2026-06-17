'use client';
import { LuKeyRound, LuFilePen, LuHouse } from 'react-icons/lu';
import { useI18n } from '@/i18n/I18nProvider';

// Language-neutral data (number, amount, icon); label/detail from dict.payment.steps
const stepData = [
  { number: '01', amount: '5.000€', icon: LuKeyRound },
  { number: '02', amount: '30%', icon: LuFilePen },
  { number: '03', amount: '70%', icon: LuHouse },
];

export const PaymentDynamic = () => {
  const { t } = useI18n();
  const steps = stepData.map((s, i) => ({
    ...s,
    label: t(`payment.steps.${i}.label`),
    detail: t(`payment.steps.${i}.detail`),
  }));

  return (
  <section className="py-12 md:py-24 bg-bg">
    <div className="safe-zone">

      {/* Header */}
      <div className="section-header" data-reveal>
        <h2
          className="text-text"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400 }}
        >
          {t('payment.title')}
        </h2>
        <span className="overline">{t('payment.eyebrow')}</span>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border" data-reveal>
        {steps.map(({ number, amount, label, detail, icon: Icon }, i) => (
          <div
            key={i}
            className="bg-bg p-4 md:p-8 xl:p-12 flex flex-col gap-5 md:gap-6 group hover:bg-bg-alt transition-colors duration-200"
          >
            {/* Number + icon row */}
            <div className="flex items-center justify-between">
              <span
                className="text-border"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 400, lineHeight: 1 }}
                aria-hidden="true"
              >
                {number}
              </span>
              <span className="w-12 h-12 flex items-center justify-center border border-border rounded-full text-text-muted group-hover:border-accent group-hover:text-accent transition-all duration-200">
                <Icon className="w-5 h-5" />
              </span>
            </div>

            {/* Amount */}
            <div>
              <p
                className="text-accent"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 400, lineHeight: 1 }}
              >
                {amount}
              </p>
              <p
                className="text-text mt-1"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 400 }}
              >
                {label}
              </p>
            </div>

            {/* Detail */}
            <p className="text-text-muted text-sm font-light leading-relaxed border-t border-border pt-5">
              {detail}
            </p>
          </div>
        ))}
      </div>

    </div>
  </section>
  );
};
