# 页面模板

## 活动页模板

```tsx
import type { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from './campaign.module.css';

const CampaignPage: NextPage = () => {
  const { t } = useTranslation('campaign');

  return (
    <main className="bg-surface-background min-h-screen">
      {/* Hero Section */}
      <section className="max-w-container mx-auto px-page py-3xl">
        <div className="grid grid-cols-12 gap-lg">
          <div className="col-span-7">
            <h1 className="text-display-large-campaign font-semibold text-text-primary mb-lg">
              {t('hero.title')}
            </h1>
            <p className="text-body-xlarge-campaign text-text-secondary mb-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex gap-lg">
              <button className="bg-white text-black rounded-pill h-14 px-12 text-button-large-campaign font-semibold">
                {t('hero.cta.primary')}
              </button>
              <button className="bg-black text-white rounded-pill h-14 px-8 text-button-large font-medium">
                {t('hero.cta.secondary')}
              </button>
            </div>
          </div>
          <div className="col-span-5">
            {/* Hero illustration */}
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="max-w-container mx-auto px-page pb-3xl">
        <h2 className="text-headline-large font-semibold text-text-primary mb-xl">
          {t('rewards.title')}
        </h2>
        {/* Reward cards */}
      </section>

      {/* Rules Section */}
      <section className="max-w-container mx-auto px-page pb-3xl">
        <div className="bg-black border border-white/20 rounded-card-lg p-xl">
          <h3 className="text-headline-medium-bold font-bold text-text-primary mb-xl">
            {t('rules.title')}
          </h3>
          <div className="text-body-medium text-text-secondary space-y-md leading-loose">
            <p>{t('rules.item1')}</p>
            <p>{t('rules.item2')}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'zh', ['common', 'campaign'])),
    },
  };
};

export default CampaignPage;
```
