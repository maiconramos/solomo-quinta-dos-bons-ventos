import Image, { type ImageProps } from "next/image";

/**
 * Wrapper around next/image that serves AVIF/WebP variants via <picture>.
 * Expects .avif and .webp files alongside the original in public/images/.
 *
 * Usage: drop-in replacement for next/image with same props.
 */
export default function OptimizedImage(props: ImageProps) {
  const { src, alt, ...rest } = props;

  if (typeof src !== "string") {
    return <Image src={src} alt={alt} {...rest} />;
  }

  // Only optimize images from /images/ with known extensions
  const match = src.match(/^(.+)\.(png|jpg|jpeg)$/i);
  if (!match) {
    return <Image src={src} alt={alt} {...rest} />;
  }

  const base = match[1];

  return (
    <picture>
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`} type="image/webp" />
      <Image src={src} alt={alt} {...rest} />
    </picture>
  );
}
