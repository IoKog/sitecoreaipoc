import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

interface Fields {
  Image: {
    value: {
      src: string;
      alt: string;
    }
  };
  Title: {
    value: string;
  };
  Subtitle: {
    value: string;
  };
}

type ImageOnTheLeftProps = ComponentProps & {
  fields: Fields;
};

export const ImageOnTheLeft = (
  props: ImageOnTheLeftProps
): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;
  const imageLeft = params.variant === "image-left";

  if (!fields) {
    return (
      <div className={`component hero-banner ${styles}`} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">Sitecore Variant</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`component hero-banner ${styles}`} id={id}>
      <div className="component-content">
        {imageLeft ? (
          <>
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
          </>
        ) : (
          <>
            <div className="hero-banner-text">
              <div className="field-herotitle">
                <ContentSdkText field={fields.Title} tag="h1" />
              </div>
              <div className="field-herosubtitle">
                <ContentSdkText field={fields.Subtitle} tag="p" />
              </div>
            </div>
            <div className="field-heroimage">
              <ContentSdkImage field={fields.Image} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};