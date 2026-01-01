// Anatomy Runner prompts and word pools for educational endless runner game

export interface AnatomyPrompt {
  prompt: string;
  category: string;
  correctWords: string[];
  incorrectWords: string[];
  level: number;
}

export const anatomyPrompts: AnatomyPrompt[] = [
  // Level 1 - Basic Identification
  {
    prompt: "Catch ARTERIES only",
    category: "Cardiovascular",
    correctWords: ["Aorta", "Carotid", "Femoral", "Radial", "Brachial", "Pulmonary", "Coronary", "Subclavian"],
    incorrectWords: ["Jugular", "Vena Cava", "Saphenous", "Portal", "Hepatic Vein", "Azygos", "Femoral Vein"],
    level: 1
  },
  {
    prompt: "Collect BONES only",
    category: "Skeletal",
    correctWords: ["Femur", "Tibia", "Humerus", "Radius", "Ulna", "Scapula", "Clavicle", "Sternum", "Vertebra"],
    incorrectWords: ["Biceps", "Triceps", "Deltoid", "Cartilage", "Tendon", "Ligament", "Quadriceps"],
    level: 1
  },
  {
    prompt: "Pick MUSCLES only",
    category: "Muscular",
    correctWords: ["Biceps", "Triceps", "Deltoid", "Quadriceps", "Gastrocnemius", "Trapezius", "Latissimus", "Pectoralis"],
    incorrectWords: ["Femur", "Tibia", "Tendon", "Ligament", "Fascia", "Humerus", "Radius"],
    level: 1
  },
  {
    prompt: "Select CRANIAL NERVES",
    category: "Nervous",
    correctWords: ["Olfactory", "Optic", "Oculomotor", "Trochlear", "Trigeminal", "Abducens", "Facial", "Vagus"],
    incorrectWords: ["Sciatic", "Femoral", "Radial", "Ulnar", "Median", "Tibial", "Phrenic"],
    level: 1
  },
  
  // Level 2 - Systems
  {
    prompt: "Catch RESPIRATORY structures",
    category: "Respiratory",
    correctWords: ["Trachea", "Bronchus", "Alveoli", "Larynx", "Pharynx", "Diaphragm", "Pleura", "Bronchiole"],
    incorrectWords: ["Esophagus", "Stomach", "Duodenum", "Jejunum", "Colon", "Liver", "Pancreas"],
    level: 2
  },
  {
    prompt: "Select DIGESTIVE organs",
    category: "Digestive",
    correctWords: ["Esophagus", "Stomach", "Duodenum", "Jejunum", "Ileum", "Colon", "Liver", "Pancreas"],
    incorrectWords: ["Trachea", "Bronchus", "Lung", "Kidney", "Ureter", "Bladder", "Urethra"],
    level: 2
  },
  {
    prompt: "Collect BRAIN regions",
    category: "Nervous",
    correctWords: ["Cerebrum", "Cerebellum", "Brainstem", "Thalamus", "Hypothalamus", "Hippocampus", "Amygdala", "Cortex"],
    incorrectWords: ["Spleen", "Thymus", "Adrenal", "Pituitary", "Thyroid", "Pancreas", "Liver"],
    level: 2
  },
  {
    prompt: "Pick VEINS only",
    category: "Cardiovascular",
    correctWords: ["Jugular", "Vena Cava", "Saphenous", "Portal", "Hepatic Vein", "Azygos", "Femoral Vein", "Basilic"],
    incorrectWords: ["Aorta", "Carotid", "Radial", "Brachial", "Pulmonary Artery", "Coronary Artery", "Subclavian Artery"],
    level: 2
  },

  // Level 3 - Embryology & Origin
  {
    prompt: "Catch MESODERM derivatives",
    category: "Embryology",
    correctWords: ["Bone", "Muscle", "Kidney", "Heart", "Blood", "Dermis", "Cartilage", "Spleen"],
    incorrectWords: ["Epidermis", "Brain", "Spinal Cord", "Liver", "Lung", "Thyroid", "Pancreas"],
    level: 3
  },
  {
    prompt: "Select ECTODERM derivatives",
    category: "Embryology",
    correctWords: ["Epidermis", "Brain", "Spinal Cord", "Retina", "Lens", "Enamel", "Hair", "Nails"],
    incorrectWords: ["Muscle", "Bone", "Kidney", "Heart", "Liver", "Stomach", "Intestine"],
    level: 3
  },
  {
    prompt: "Collect ENDODERM derivatives",
    category: "Embryology",
    correctWords: ["Liver", "Pancreas", "Thyroid", "Lung Epithelium", "Bladder Lining", "Gut Lining", "Tonsils", "Thymus"],
    incorrectWords: ["Brain", "Muscle", "Bone", "Skin", "Heart", "Kidney", "Blood"],
    level: 3
  },

  // Level 4 - Relations & Functions
  {
    prompt: "Catch structures in CARPAL TUNNEL",
    category: "Relations",
    correctWords: ["Median Nerve", "Flexor Tendons", "Flexor Pollicis", "Flexor Digitorum"],
    incorrectWords: ["Ulnar Nerve", "Radial Nerve", "Extensor Tendons", "Brachial Artery", "Radial Artery"],
    level: 4
  },
  {
    prompt: "Select PORTAL SYSTEM structures",
    category: "Cardiovascular",
    correctWords: ["Portal Vein", "Splenic Vein", "SMV", "IMV", "Gastric Veins", "Liver Sinusoids"],
    incorrectWords: ["Hepatic Artery", "Aorta", "IVC", "Hepatic Veins", "Renal Vein", "Femoral Artery"],
    level: 4
  },
  {
    prompt: "Catch what passes through DIAPHRAGM",
    category: "Relations",
    correctWords: ["Aorta", "Esophagus", "IVC", "Vagus Nerve", "Phrenic Nerve", "Thoracic Duct", "Azygos Vein"],
    incorrectWords: ["Trachea", "Bronchus", "Heart", "Lungs", "Thymus", "Superior Vena Cava"],
    level: 4
  },

  // Level 5 - Clinical Correlation
  {
    prompt: "Select structures affected in STROKE",
    category: "Clinical",
    correctWords: ["Motor Cortex", "MCA Territory", "Basal Ganglia", "Internal Capsule", "Broca Area", "Wernicke Area"],
    incorrectWords: ["Cerebellum", "Spinal Cord", "Peripheral Nerve", "Muscle", "Heart", "Kidney"],
    level: 5
  },
  {
    prompt: "Catch BRACHIAL PLEXUS nerves",
    category: "Nervous",
    correctWords: ["Musculocutaneous", "Median", "Ulnar", "Radial", "Axillary", "Long Thoracic", "Suprascapular"],
    incorrectWords: ["Femoral", "Sciatic", "Tibial", "Obturator", "Pudendal", "Phrenic", "Vagus"],
    level: 5
  },
  {
    prompt: "Select structures in FEMORAL TRIANGLE",
    category: "Relations",
    correctWords: ["Femoral Nerve", "Femoral Artery", "Femoral Vein", "Inguinal Ligament", "Sartorius", "Adductor Longus"],
    incorrectWords: ["Sciatic Nerve", "Obturator", "Gluteal Artery", "Popliteal", "Tibial Nerve", "Iliac Crest"],
    level: 5
  }
];

export const getPromptsForLevel = (level: number): AnatomyPrompt[] => {
  return anatomyPrompts.filter(p => p.level <= level);
};

export const getRandomPrompt = (level: number): AnatomyPrompt => {
  const available = getPromptsForLevel(level);
  return available[Math.floor(Math.random() * available.length)];
};
