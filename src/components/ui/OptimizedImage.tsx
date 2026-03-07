import Image, { type ImageProps } from "next/image";

/**
 * Wrapper around next/image that serves AVIF/WebP variants via <picture>.
 * Expects .avif and .webp files alongside the original in public/images/.
 *
 * When priority={true}, uses AVIF directly as src to avoid the browser
 * preloading the original PNG/JPG alongside the optimized format.
 *
 * Usage: drop-in replacement for next/image with same props.
 */
export default function OptimizedImage(props: ImageProps) {
  const { src, alt, ...rest } = props;

  if (typeof src !== "string") {
    return <Image src={src} alt={alt} {...rest} />;
  }

  // Only optimize images with known raster extensions
  const match = src.match(/^(.+)\.(png|jpg|jpeg)$/i);
  if (!match) {
    return <Image src={src} alt={alt} {...rest} />;
  }

  const base = match[1];

  // When priority is set, next/image injects <link rel="preload"> for the src.
  // This causes the browser to download BOTH the original and the AVIF/WebP.
  // To avoid double downloads, use AVIF as the src for priority images.
  if (props.priority) {
    return (
      <picture>
        <source srcSet={`${base}.avif`} type="image/avif" />
        <source srcSet={`${base}.webp`} type="image/webp" />
        <Image src={`${base}.avif`} alt={alt} {...rest} />
      </picture>
    );
  }

  return (
    <picture>
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`} type="image/webp" />
      <Image src={src} alt={alt} {...rest} />
    </picture>
  );
}
