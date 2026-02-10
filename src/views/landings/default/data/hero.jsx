// @mui
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

export const hero = {
  chip: {
    label: (
      <>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          AI-Powered
        </Typography>
        <Chip
          label="OCR Processing"
          slotProps={{ label: { sx: { px: 1.5, typography: 'caption', color: 'primary.main' } } }}
          sx={{ height: 24, bgcolor: 'primary.lighter', mr: -1, ml: 0.75 }}
          icon={
            <CardMedia
              component="img"
              image="/assets/images/shared/celebration.gif"
              sx={{ width: 16, height: 16, pl: 0.5 }}
              alt="AI Processing"
              loading="lazy"
            />
          }
        />
      </>
    )
  },
  headLine: 'Smart Document Processing & OCR Extraction',
  captionLine: 'Transform documents into structured data instantly. Upload images, PDFs, and scans—our AI extracts text, tables, and forms with 99% accuracy.',
  primaryBtn: { children: 'Try OCR Demo', href: '/ocr-demo' },
  secondaryBtn: { children: 'View API Docs', href: '/docs' },
  videoSrc: 'https://d2elhhoq00m1pj.cloudfront.net/ocr-demo.mp4',
  videoThumbnail: '/assets/videos/thumbnails/ocr-thumbnail.png',
  listData: [
    {
      image: '/assets/images/ocr/auto-detect.svg',
      title: 'Auto Detection',
      description: 'Smart layout analysis and field recognition'
    },
    {
      image: '/assets/images/ocr/handwriting.svg',
      title: 'Handwriting Support',
      description: 'Reads handwritten text with advanced AI models'
    },
    {
      image: '/assets/images/ocr/multi-format.svg',
      title: '50+ Formats',
      description: 'PDF, JPG, PNG, TIFF, and document formats'
    },
    {
      image: '/assets/images/ocr/real-time.svg',
      title: 'Real-time Processing',
      description: 'Process documents in seconds, not minutes'
    }
  ]
};
