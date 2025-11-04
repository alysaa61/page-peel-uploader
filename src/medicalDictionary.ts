export interface MedicalTerm {
  term: string;
  definition: string;
  category?: string;
}

export const medicalDictionary: MedicalTerm[] = [
  { term: 'Tachycardia', definition: 'Abnormally rapid heart rate, typically over 100 bpm', category: 'Cardiology' },
  { term: 'Bradycardia', definition: 'Abnormally slow heart rate, typically under 60 bpm', category: 'Cardiology' },
  { term: 'Hypoxia', definition: 'Deficiency in the amount of oxygen reaching tissues', category: 'Respiratory' },
  { term: 'Anemia', definition: 'Condition with reduced red blood cells or hemoglobin', category: 'Hematology' },
  { term: 'Hyperglycemia', definition: 'Abnormally high blood glucose levels', category: 'Endocrinology' },
  { term: 'Hypoglycemia', definition: 'Abnormally low blood glucose levels', category: 'Endocrinology' },
  { term: 'Atrophy', definition: 'Wasting away or decrease in size of tissue or organ', category: 'Pathology' },
  { term: 'Hypertrophy', definition: 'Increase in size of tissue or organ', category: 'Pathology' },
  { term: 'Edema', definition: 'Abnormal accumulation of fluid in tissues', category: 'Pathology' },
  { term: 'Ischemia', definition: 'Inadequate blood supply to tissue or organ', category: 'Pathology' },
  { term: 'Necrosis', definition: 'Death of cells or tissues in a living organism', category: 'Pathology' },
  { term: 'Apoptosis', definition: 'Programmed cell death', category: 'Pathology' },
  { term: 'Dyspnea', definition: 'Difficulty breathing or shortness of breath', category: 'Respiratory' },
  { term: 'Tachypnea', definition: 'Abnormally rapid breathing', category: 'Respiratory' },
  { term: 'Cyanosis', definition: 'Bluish discoloration due to inadequate oxygenation', category: 'Clinical Signs' },
  { term: 'Jaundice', definition: 'Yellowing of skin and eyes due to bilirubin buildup', category: 'Clinical Signs' },
  { term: 'Pallor', definition: 'Abnormal paleness of skin', category: 'Clinical Signs' },
  { term: 'Hemoptysis', definition: 'Coughing up blood from respiratory tract', category: 'Respiratory' },
  { term: 'Hematemesis', definition: 'Vomiting blood', category: 'Gastroenterology' },
  { term: 'Hematuria', definition: 'Blood in urine', category: 'Nephrology' },
  { term: 'Polyuria', definition: 'Excessive urination', category: 'Nephrology' },
  { term: 'Oliguria', definition: 'Decreased urine output', category: 'Nephrology' },
  { term: 'Anuria', definition: 'Absence of urine production', category: 'Nephrology' },
  { term: 'Syncope', definition: 'Temporary loss of consciousness; fainting', category: 'Neurology' },
  { term: 'Vertigo', definition: 'Sensation of spinning or dizziness', category: 'Neurology' },
  { term: 'Paresthesia', definition: 'Abnormal sensation like tingling or numbness', category: 'Neurology' },
  { term: 'Seizure', definition: 'Sudden, uncontrolled electrical disturbance in brain', category: 'Neurology' },
  { term: 'Myalgia', definition: 'Muscle pain', category: 'Musculoskeletal' },
  { term: 'Arthralgia', definition: 'Joint pain', category: 'Musculoskeletal' },
  { term: 'Thrombosis', definition: 'Formation of blood clot inside blood vessel', category: 'Hematology' }
];

export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
