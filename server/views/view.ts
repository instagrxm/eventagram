import { HashTag } from "../entity/HashTag";
import { Media } from "../entity/Media";

export async function saveHashTag(hash) {
  try {
    const p = await HashTag.findOneOrFail({ where: { name: hash.name } });
    p.mediaCount = hash.media_count;
    p.updatedAt = new Date();
    return p.save();
  } catch (e) {
    const p = new HashTag();
    p.name = hash.name;
    p.isProcessing = hash.isProcessing;
    p.mediaCount = hash.media_count;
    return p.save();
  }
}
interface Imedia {
  media_id: string;
  username: string;
  taken_at: string;
  like_count: number;
  comment_count: number;
  caption: string;
}
export async function saveMedia(hashtag: string, media: Imedia) {
  const h = await HashTag.findOneOrFail({ where: { name: hashtag } });
  try {
    const media_obj = await Media.findOneOrFail({
      where: { mediaId: media.media_id }
    });
    media_obj.username = media.username;
    media_obj.mediaId = media.media_id;
    media_obj.takenAt = new Date(Number(media.taken_at) * 1000);
    media_obj.likeCount = media.like_count;
    media_obj.commentCount = media.comment_count;
    media_obj.caption = media.caption;
    media_obj.hashtag = h;
    await media_obj.save();
  } catch (e) {
    const media_obj = new Media();
    media_obj.username = media.username;
    media_obj.mediaId = media.media_id;
    media_obj.takenAt = new Date(Number(media.taken_at) * 1000);
    media_obj.likeCount = media.like_count;
    media_obj.commentCount = media.comment_count;
    media_obj.caption = media.caption;
    media_obj.hashtag = h;
    await media_obj.save();
  }
}
