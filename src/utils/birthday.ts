export const getAge = (): number => {
  const birthDate = new Date('2000-05-08'); // Update with actual birthdate
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const getBirthdayMessage = (age: number): string => {
  const messages = [
    `Happy ${age}th birthday! Another year of medical wisdom acquired.`,
    `${age} years strong! Keep saving lives and acing exams.`,
    `Cheers to ${age} years! May your coffee be strong and your exams be easy.`,
    `${age} looks good on you! Here's to another year of learning and growing.`
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

export const isBirthday = (): boolean => {
  const today = new Date();
  const birthDate = new Date('2000-05-08'); // Update with actual birthdate
  
  return today.getMonth() === birthDate.getMonth() && 
         today.getDate() === birthDate.getDate();
};
