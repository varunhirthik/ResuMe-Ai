import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

// Register fonts for better ATS compatibility
Font.register({
  family: 'Arial',
  src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4taVQUwaEQbjB_mQ.ttf',
});

// ATS-friendly styles following the blueprint guidelines
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Arial',
    fontSize: 11,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottom: 1,
    borderBottomColor: '#000000',
    paddingBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  contactInfo: {
    fontSize: 10,
    color: '#000000',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#000000',
    textTransform: 'uppercase',
    borderBottom: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
  },
  subsectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    color: '#000000',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
  },
  companyName: {
    fontSize: 11,
    color: '#000000',
  },
  dateLocation: {
    fontSize: 10,
    color: '#000000',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 3,
    marginLeft: 10,
  },
  bullet: {
    fontSize: 10,
    marginRight: 5,
    color: '#000000',
  },
  bulletText: {
    fontSize: 10,
    flex: 1,
    color: '#000000',
  },
  summary: {
    fontSize: 11,
    marginBottom: 10,
    textAlign: 'justify',
    color: '#000000',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  skillCategory: {
    fontSize: 11,
    fontWeight: 'bold',
    marginRight: 8,
    marginBottom: 4,
    color: '#000000',
  },
  skillList: {
    fontSize: 10,
    marginBottom: 6,
    color: '#000000',
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
  },
  institution: {
    fontSize: 11,
    color: '#000000',
  },
});

interface ResumeTemplateProps {
  data: ResumeData;
}

const ATSResumeTemplate: React.FC<ResumeTemplateProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatDateRange = (startDate: string, endDate?: string, isCurrent?: boolean) => {
    const start = formatDate(startDate);
    if (isCurrent) {
      return `${start} - Present`;
    }
    const end = endDate ? formatDate(endDate) : '';
    return end ? `${start} - ${end}` : start;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.contactInfo}>
            {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}
          </Text>
          {(data.personalInfo.linkedIn || data.personalInfo.website || data.personalInfo.github) && (
            <Text style={styles.contactInfo}>
              {[data.personalInfo.linkedIn, data.personalInfo.website, data.personalInfo.github]
                .filter(Boolean)
                .join(' | ')}
            </Text>
          )}
        </View>

        {/* Professional Summary */}
        {data.summary && (
          <View>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {data.workExperience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.workExperience.map((experience) => (
              <View key={experience.id} style={{ marginBottom: 12 }}>
                <View style={styles.jobHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{experience.jobTitle}</Text>
                    <Text style={styles.companyName}>{experience.company}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.dateLocation}>
                      {formatDateRange(experience.startDate, experience.endDate, experience.isCurrentRole)}
                    </Text>
                    {experience.location && (
                      <Text style={styles.dateLocation}>{experience.location}</Text>
                    )}
                  </View>
                </View>
                
                {experience.description && (
                  <Text style={{ fontSize: 10, marginBottom: 4, color: '#000000' }}>
                    {experience.description}
                  </Text>
                )}
                
                {experience.achievements.map((achievement, index) => (
                  <View key={index} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{achievement}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 8 }}>
                <View style={styles.educationHeader}>
                  <View>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    <Text style={styles.institution}>{edu.institution}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.dateLocation}>{formatDate(edu.graduationDate)}</Text>
                    {edu.location && (
                      <Text style={styles.dateLocation}>{edu.location}</Text>
                    )}
                  </View>
                </View>
                {edu.gpa && (
                  <Text style={{ fontSize: 10, color: '#000000' }}>GPA: {edu.gpa}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            {['technical', 'soft', 'language', 'certification'].map((category) => {
              const categorySkills = data.skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              
              const categoryName = {
                technical: 'Technical',
                soft: 'Soft Skills',
                language: 'Languages',
                certification: 'Certifications'
              }[category];

              return (
                <View key={category} style={{ marginBottom: 6 }}>
                  <Text style={styles.skillList}>
                    <Text style={styles.skillCategory}>{categoryName}: </Text>
                    {categorySkills.map(skill => skill.name).join(', ')}
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {data.projects.slice(0, 3).map((project) => ( // Limit to 3 projects for space
              <View key={project.id} style={{ marginBottom: 10 }}>
                <Text style={styles.subsectionHeader}>{project.name}</Text>
                <Text style={{ fontSize: 10, marginBottom: 3, color: '#000000' }}>
                  {project.description}
                </Text>
                {project.technologies.length > 0 && (
                  <Text style={{ fontSize: 10, marginBottom: 3, color: '#000000' }}>
                    <Text style={{ fontWeight: 'bold' }}>Technologies: </Text>
                    {project.technologies.join(', ')}
                  </Text>
                )}
                {project.achievements.map((achievement, index) => (
                  <View key={index} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{achievement}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert) => (
              <View key={cert.id} style={{ marginBottom: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#000000' }}>
                    {cert.name}
                  </Text>
                  <Text style={styles.dateLocation}>
                    {formatDate(cert.dateIssued)}
                    {cert.expirationDate && ` - ${formatDate(cert.expirationDate)}`}
                  </Text>
                </View>
                <Text style={{ fontSize: 10, color: '#000000' }}>{cert.issuer}</Text>
                {cert.credentialId && (
                  <Text style={{ fontSize: 9, color: '#000000' }}>
                    Credential ID: {cert.credentialId}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ATSResumeTemplate;
