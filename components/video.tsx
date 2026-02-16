interface VideoProps {
  src: string
  caption?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  width?: number
}

export function Video({
  src,
  caption,
  autoPlay = true,
  loop = true,
  muted = true,
  width
}: VideoProps) {
  const videoPath = src.startsWith('/') ? src : `/videos/${src}`

  return (
    <figure className="my-6">
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-neutral-700 max-w-3xl mx-auto">
        <video
          src={videoPath}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          controls
          className="w-full h-auto"
          style={width ? { maxWidth: width } : undefined}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
