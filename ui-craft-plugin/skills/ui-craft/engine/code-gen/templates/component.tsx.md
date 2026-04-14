# 组件模板

## 基础组件

```tsx
import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import styles from './ComponentName.module.css';

interface ComponentNameProps {
  title: string;
  description?: string;
  onAction?: () => void;
}

export const ComponentName: FC<ComponentNameProps> = ({
  title,
  description,
  onAction,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.container}>
      <h2 className="text-headline-medium font-semibold text-text-primary">
        {title}
      </h2>
      {description && (
        <p className="text-body-medium text-text-secondary">
          {description}
        </p>
      )}
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="bg-action-primary text-text-inverse rounded-control px-lg py-sm"
        >
          {t('action')}
        </button>
      )}
    </div>
  );
};
```

## 活动页卡片

```tsx
import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import styles from './CampaignCard.module.css';

interface CampaignCardProps {
  title: string;
  items: Array<{ label: string; value: string }>;
  variant?: 'black' | 'white' | 'blue';
}

export const CampaignCard: FC<CampaignCardProps> = ({
  title,
  items,
  variant = 'black',
}) => {
  const { t } = useTranslation('campaign');

  const variantStyles = {
    black: 'bg-black border border-white/20 text-white',
    white: 'bg-white text-black',
    blue: 'bg-action-primary text-white',
  };

  return (
    <div className={`rounded-card-lg p-xl ${variantStyles[variant]}`}>
      <h3 className="text-title-large font-semibold mb-lg">
        {title}
      </h3>
      <div className="space-y-sm">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="opacity-70">{item.label}</span>
            <span className="text-accent-highlight font-semibold">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
```
