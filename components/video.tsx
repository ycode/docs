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
    <figure className="video">
      <div className="video-container">
        <video
          src={videoPath}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          controls
          className="video-player"
          style={width ? { maxWidth: width } : undefined}
        />
      </div>
      {caption && (
        <figcaption className="video-caption">{caption}</figcaption>
      )}
    </figure>
  )
}
