import { motion } from "framer-motion";
import { memo, useState } from "react";
import type { ScreenshotsProps } from "config/types";
import { areImagesEqual } from "config/types";
import DeviceToggle from "@components/ui/DeviceToggle";

const PHONE_WIDTH = 260;
const PHONE_HEIGHT = 462;
const DESKTOP_WIDTH = 460;
const DESKTOP_HEIGHT = 259;

const Screenshots = ({ images }: ScreenshotsProps) => {
	const [activeDevice, setActiveDevice] = useState<"android" | "desktop">("android");
	const currentImages = images[activeDevice];
	const isDesktop = activeDevice === "desktop";
	const width = isDesktop ? DESKTOP_WIDTH : PHONE_WIDTH;
	const height = isDesktop ? DESKTOP_HEIGHT : PHONE_HEIGHT;

	return (
		<div className="mb-16">
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-2xl font-semibold">Screenshots</h2>
				<DeviceToggle activeDevice={activeDevice} onToggle={setActiveDevice} />
			</div>
			<div className="relative overflow-hidden">
				<motion.div
					initial={false}
					className="screenshots-container overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"
				>
					<div className="flex gap-6 pb-4">
						{currentImages.map((image, index) => (
							<motion.button
								key={`${activeDevice}-${image}`}
								initial={false}
								type="button"
								onClick={() => window.openLightbox?.(index, activeDevice)}
								className="relative flex-shrink-0 overflow-hidden rounded-xl focus:outline-none"
							>
								<img
									src={image}
									alt={`Screenshot ${activeDevice} ${index + 1}`}
									width={width}
									height={height}
									className={`rounded-xl border border-gray-200 bg-gray-100 object-cover ${
										isDesktop
											? "aspect-[16/9] w-[460px]"
											: "aspect-[9/16] w-[260px]"
									}`}
									loading={index === 0 && !isDesktop ? "eager" : "lazy"}
									decoding="async"
									fetchPriority={index === 0 && !isDesktop ? "high" : "low"}
								/>
							</motion.button>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default memo(Screenshots, areImagesEqual);
