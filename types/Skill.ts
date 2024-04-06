interface Color {
    dark: string;
    light: string;
}

type SkillCategory = 'Technical' | 'Language' | 'Other';

export interface Skill {
    skillName: string;
    color: Color;
    percentage: string;
    iconName: string;
    experience: number;
    category: SkillCategory;
}

