import { ImagePool } from "@squoosh/lib"
import { readdirSync, readFileSync } from "fs"
import { writeFile } from "fs/promises"
import path from "path"

const imagePool = new ImagePool()
const IMAGE_DIR = "./src/img"
const imageFileList = readdirSync(IMAGE_DIR).filter((file) => {
	const regex = /\.(jpe?g|png)$/i
	return regex.test(file)
})
const imagePoolList = imageFileList.map((file) => {
	const imageFile = readFileSync(`${IMAGE_DIR}/${file}`);
	const fileName = path.parse(`${IMAGE_DIR}/${file}`).name;
	const image = imagePool.ingestImage(imageFile.buffer.slice(imageFile.byteOffset, imageFile.byteOffset + imageFile.byteLength))
	return { name: fileName, image };
});

const webpEncodeOptions = {
	webp: {"quality":90,"target_size":0,"target_PSNR":0,"method":4,"sns_strength":50,"filter_strength":60,"filter_sharpness":0,"filter_type":1,"partitions":0,"segments":4,"pass":1,"show_compressed":0,"preprocessing":0,"autofilter":0,"partition_limit":0,"alpha_compression":1,"alpha_filtering":1,"alpha_quality":100,"lossless":0,"exact":0,"image_hint":0,"emulate_jpeg_size":0,"thread_level":0,"low_memory":0,"near_lossless":100,"use_delta_palette":0,"use_sharp_yuv":0}
}

await Promise.all(
	imagePoolList.map(async(item) => {
		const { image } = item
		await image.encode(webpEncodeOptions)
	}),
)

for (const item of imagePoolList) {
	const {
		name,
		image: { encodedWith },
	} = item
	const data = await encodedWith.webp
	await writeFile(`${IMAGE_DIR}/${name}.webp`, data.binary)
}

// imagePoolを閉じる
await imagePool.close();
