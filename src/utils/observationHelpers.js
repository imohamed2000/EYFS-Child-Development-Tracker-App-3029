// Utility functions for improving observation writing
export const getPronouns = (gender) => {
  switch (gender?.toLowerCase()) {
    case 'male':
      return {
        subject: 'he',
        object: 'him', 
        possessive: 'his',
        reflexive: 'himself'
      };
    case 'female':
      return {
        subject: 'she',
        object: 'her',
        possessive: 'her', 
        reflexive: 'herself'
      };
    default:
      return {
        subject: 'they',
        object: 'them',
        possessive: 'their',
        reflexive: 'themselves'
      };
  }
};

export const formatObservationText = (text, childName, gender) => {
  if (!text || !childName) return text;

  const pronouns = getPronouns(gender);
  
  // Replace placeholders in order of specificity
  let formattedText = text
    // Replace [child] with actual name
    .replace(/\[child\]/g, childName)
    .replace(/\[Child\]/g, childName)
    .replace(/\[CHILD\]/g, childName.toUpperCase())
    
    // Replace pronoun placeholders
    .replace(/\[he\/she\]/g, pronouns.subject)
    .replace(/\[He\/She\]/g, pronouns.subject.charAt(0).toUpperCase() + pronouns.subject.slice(1))
    .replace(/\[him\/her\]/g, pronouns.object)
    .replace(/\[Him\/Her\]/g, pronouns.object.charAt(0).toUpperCase() + pronouns.object.slice(1))
    .replace(/\[his\/her\]/g, pronouns.possessive)
    .replace(/\[His\/Her\]/g, pronouns.possessive.charAt(0).toUpperCase() + pronouns.possessive.slice(1))
    .replace(/\[himself\/herself\]/g, pronouns.reflexive)
    .replace(/\[Himself\/Herself\]/g, pronouns.reflexive.charAt(0).toUpperCase() + pronouns.reflexive.slice(1))
    
    // Handle generic pronouns for backwards compatibility
    .replace(/\bhe\/she\b/g, pronouns.subject)
    .replace(/\bHe\/She\b/g, pronouns.subject.charAt(0).toUpperCase() + pronouns.subject.slice(1))
    .replace(/\bhim\/her\b/g, pronouns.object)
    .replace(/\bHim\/Her\b/g, pronouns.object.charAt(0).toUpperCase() + pronouns.object.slice(1))
    .replace(/\bhis\/her\b/g, pronouns.possessive)
    .replace(/\bHis\/Her\b/g, pronouns.possessive.charAt(0).toUpperCase() + pronouns.possessive.slice(1));

  return formattedText;
};

export const createSmartObservationText = (template, childName, gender, observationType = 'Learning Story') => {
  // First format with name and pronouns
  let formattedText = formatObservationText(template, childName, gender);
  
  // Ensure the first sentence uses the child's name instead of pronouns
  const pronouns = getPronouns(gender);
  const sentences = formattedText.split(/[.!?]+/);
  
  if (sentences.length > 0 && sentences[0].trim()) {
    let firstSentence = sentences[0].trim();
    
    // Replace pronouns at the start of the first sentence with the child's name
    const subjectPattern = new RegExp(`^${pronouns.subject.charAt(0).toUpperCase() + pronouns.subject.slice(1)}\\b`, 'i');
    const lowerSubjectPattern = new RegExp(`^${pronouns.subject}\\b`, 'i');
    
    if (subjectPattern.test(firstSentence)) {
      firstSentence = firstSentence.replace(subjectPattern, childName);
    } else if (lowerSubjectPattern.test(firstSentence)) {
      firstSentence = firstSentence.replace(lowerSubjectPattern, childName);
    }
    
    // Reconstruct the text
    sentences[0] = firstSentence;
    formattedText = sentences.join('. ').replace(/\.\s*\./g, '.');
  }
  
  return formattedText;
};