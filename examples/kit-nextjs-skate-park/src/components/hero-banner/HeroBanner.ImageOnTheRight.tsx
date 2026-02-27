import React from 'react';
import {
  NextImage as ContentSdkImage,
  Text as ContentSdkText
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Image: { value: { src: string; alt: string } };
  Title: { value: string };
  Subtitle: { value: string };
  VariantImage: { value: { src: string; alt: string } };
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

export const ImageOnTheRight = (props: HeroBannerProps): JSX.Element => {
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
    <div className={`component hero-banner variant ${styles}`} id={id}>
      <div className="component-content" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="field-heroimage" style={{ flex: '1' }}>
          <ContentSdkImage field={fields.Image} />
        </div>
        <div className="hero-banner-text" style={{ flex: '2', textAlign: 'center', padding: '0 1rem' }}>
          <div className="field-herotitle">
            <ContentSdkText field={fields.Title} tag="h1" />
          </div>
          <div className="field-herosubtitle">
            <ContentSdkText field={fields.Subtitle} tag="p" />
          </div>
        </div>
        <div className="field-variantimage" style={{ flex: '1' }}>
          <ContentSdkImage field={fields.VariantImage} />
        </div>
      </div>
    </div>
  );
};