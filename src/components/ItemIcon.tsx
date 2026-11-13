import {
  Anvil,
  Atom,
  Axe,
  BatteryCharging,
  Bike,
  Box,
  Brain,
  Building2,
  Cable,
  Camera,
  Cog,
  Cpu,
  Crown,
  Cylinder,
  Fan,
  Flame,
  Flashlight,
  FlaskConical,
  Flower2,
  Gem,
  Glasses,
  Globe,
  Hammer,
  Hexagon,
  Home,
  Hourglass,
  Landmark,
  Layers,
  Lightbulb,
  Link2,
  MapPin,
  Mic,
  Microscope,
  Navigation,
  Orbit,
  Phone,
  Pill,
  Plane,
  Radio,
  Rocket,
  Satellite,
  Shield,
  Smartphone,
  Snowflake,
  Sparkles,
  Sprout,
  Sun,
  Target,
  Telescope,
  ToggleRight,
  Volume2,
  Wind,
  Zap,
  Beaker,
} from 'lucide-react';

interface ItemIconProps {
  iconKey: string;
  className?: string;
}

export function ItemIcon({ iconKey, className = 'w-5 h-5' }: ItemIconProps) {
  switch (iconKey) {
    case 'hammer':
      return <Hammer className={className} />;
    case 'axe':
      return <Axe className={className} />;
    case 'flame':
      return <Flame className={className} />;
    case 'link':
      return <Link2 className={className} />;
    case 'cylinder':
      return <Cylinder className={className} />;
    case 'home':
      return <Home className={className} />;
    case 'navigation':
      return <Navigation className={className} />;
    case 'target':
      return <Target className={className} />;
    case 'anvil':
      return <Anvil className={className} />;
    case 'cable':
      return <Cable className={className} />;
    case 'plane':
      return <Plane className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'crown':
      return <Crown className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'gem':
      return <Gem className={className} />;
    case 'landmark':
      return <Landmark className={className} />;
    case 'hourglass':
      return <Hourglass className={className} />;
    case 'flask':
      return <FlaskConical className={className} />;
    case 'beaker':
      return <Beaker className={className} />;
    case 'hexagon':
      return <Hexagon className={className} />;
    case 'droplets':
      return <Sparkles className={className} />;
    case 'glasses':
      return <Glasses className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'building':
      return <Building2 className={className} />;
    case 'flower':
      return <Flower2 className={className} />;
    case 'zap':
      return <Zap className={className} />;
    case 'sprout':
      return <Sprout className={className} />;
    case 'battery':
      return <BatteryCharging className={className} />;
    case 'lightbulb':
      return <Lightbulb className={className} />;
    case 'toggleRight':
      return <ToggleRight className={className} />;
    case 'sun':
      return <Sun className={className} />;
    case 'flashlight':
      return <Flashlight className={className} />;
    case 'cog':
      return <Cog className={className} />;
    case 'fan':
      return <Fan className={className} />;
    case 'volume2':
      return <Volume2 className={className} />;
    case 'mic':
      return <Mic className={className} />;
    case 'camera':
      return <Camera className={className} />;
    case 'telescope':
      return <Telescope className={className} />;
    case 'microscope':
      return <Microscope className={className} />;
    case 'bike':
      return <Bike className={className} />;
    case 'snowflake':
      return <Snowflake className={className} />;
    case 'wind':
      return <Wind className={className} />;
    case 'cpu':
      return <Cpu className={className} />;
    case 'rocket':
      return <Rocket className={className} />;
    case 'radio':
      return <Radio className={className} />;
    case 'antenna':
      return <Radio className={className} />;
    case 'phone':
      return <Phone className={className} />;
    case 'orbit':
      return <Orbit className={className} />;
    case 'mapPin':
      return <MapPin className={className} />;
    case 'smartphone':
      return <Smartphone className={className} />;
    case 'atom':
      return <Atom className={className} />;
    case 'satellite':
      return <Satellite className={className} />;
    case 'pill':
      return <Pill className={className} />;
    case 'box':
      return <Box className={className} />;
    case 'brain':
      return <Brain className={className} />;
    case 'globe':
      return <Globe className={className} />;
    default:
      return <Atom className={className} />;
  }
}
