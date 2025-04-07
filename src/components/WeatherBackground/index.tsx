'use client';
import { Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { isCurrentlyDaytime } from './isCurrentlyDaytime';
import { translateWeatherCondition } from './translateWeatherCondition';
import { getBackgroundImage } from './getBackgroundImage';

export interface WeatherBackgroundProps {
  children: React.ReactNode;
  weatherCondition?: string;
  sunrise: string;
  sunset: string;
  lat: number;
  lon: number;
}

const MotionBox = motion.create(Box);

export function WeatherBackground({
  children,
  weatherCondition = '',
  sunrise,
  sunset,
  lat,
  lon,
}: WeatherBackgroundProps) {
  const isDaytime = isCurrentlyDaytime(sunrise, sunset, lat, lon);
  const translatedCondition = translateWeatherCondition(weatherCondition);
  const imageUrl = getBackgroundImage(translatedCondition, isDaytime);
  const backgroundKey = `${translatedCondition}-${isDaytime}`;

  return (
    <Box
      minH="100vh"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      overflow="hidden"
      w="100%"
    >
      <AnimatePresence mode="wait">
        <MotionBox
          key={backgroundKey}
          initial={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage={`url(${imageUrl})`}
          bgSize="cover"
          bgPosition="center"
          zIndex={0}
        />
      </AnimatePresence>

      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.600"
        zIndex="1"
      />

      <Box position="relative" zIndex="2" w="100%">
        {children}
      </Box>
    </Box>
  );
}
