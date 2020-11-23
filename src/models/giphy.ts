export interface IGifImageModel {
  url?: string
  width?: string
  height?: string
  size?: string
  mp4?: string
  mp4_size?: string
  webp?: string
  webp_size?: string
}

export interface IGifImagesModel {
  fixed_height: IGifImageModel
  fixed_height_still: IGifImageModel
  fixed_height_downsampled: IGifImageModel
  fixed_width: IGifImageModel
  fixed_width_still: IGifImageModel
  fixed_width_downsampled: IGifImageModel
  fixed_height_small: IGifImageModel
  fixed_height_small_still: IGifImageModel
  fixed_width_small: IGifImageModel
  fixed_width_small_still: IGifImageModel
  downsized: IGifImageModel
  downsized_still: IGifImageModel
  downsized_large: IGifImageModel
  downsized_medium: IGifImageModel
  downsized_small: IGifImageModel
  original: IGifImageModel
  original_still: IGifImageModel
  looping: IGifImageModel
  preview: IGifImageModel
  preview_gif: IGifImageModel
}

export interface IGifObjectModel {
  type: 'gif' | 'sticker'
  id: string
  slug: string
  url: string
  bitly_url: string
  embed_url: string
  username: string
  source: string
  source_tld: string
  source_post_url: string
  update_datetime: string
  create_datetime: string
  import_datetime: string
  trending_datetime: string
  images: IGifImagesModel
  title: string
}

export interface IGiphyPaginationModel {
  total_count: number
  count: number
  offset: number
}

export interface IGiphyMetaModel {
  status: number
  msg: string
  response_id: string
}

export interface IGiphyResultModel {
  data: any[]
}

export interface IGiphySearchResultModel {
  data: IGifObjectModel[]
}
