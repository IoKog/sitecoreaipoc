import { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  ImageField,
  Field,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Image: ImageField;
  Title: Field<string>;
  Subtitle: Field<string>;
}

type HeroBannerProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: HeroBannerProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;

  if (!fields) {
    return (
      <div className={`component hero-banner ${styles}`} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">HeroBanner</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`component hero-banner ${styles}`} id={id}>
      <div className="component-content">
        <div className="field-heroimage">
          <ContentSdkImage field={fields.Image} />
        </div>
        <div className="hero-banner-text">
          <div className="field-herotitle">
            <ContentSdkText field={fields.Title} tag="h1" />
          </div>
          <div className="field-herosubtitle">
            <ContentSdkText field={fields.Subtitle} tag="p" />
          </div>
        </div>
      </div>
    </div>
  );
};
