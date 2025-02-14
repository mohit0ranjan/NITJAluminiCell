import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsPDF } from 'jspdf';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface VerificationData {
  fullName: string;
  rollNumber: string;
  graduationYear: string;
  department: string;
  currentOrganization: string;
  designation: string;
  purpose: string;
  requestId: string;
}

export const generateVerificationForm = (data: VerificationData) => {
  const doc = new jsPDF();
  
  // Add background color
  doc.setFillColor(240, 248, 255);
  doc.rect(0, 0, 210, 297, 'F');
  
  // Add decorative border
  doc.setDrawColor(25, 93, 175);
  doc.setLineWidth(2);
  doc.rect(10, 10, 190, 277);
  doc.setLineWidth(0.5);
  doc.rect(12, 12, 186, 273);
  
  // Add header with logo placeholder
  doc.setFontSize(24);
  doc.setTextColor(25, 93, 175);
  doc.text('DR B R AMBEDKAR', 105, 40, { align: 'center' });
  doc.text('NATIONAL INSTITUTE OF TECHNOLOGY', 105, 50, { align: 'center' });
  doc.text('JALANDHAR', 105, 60, { align: 'center' });
  
  // Add certificate title
  doc.setFontSize(28);
  doc.setTextColor(0, 0, 0);
  doc.text('ALUMNI VERIFICATION', 105, 85, { align: 'center' });
  doc.text('CERTIFICATE', 105, 95, { align: 'center' });
  
  // Add decorative line
  doc.setLineWidth(1);
  doc.setDrawColor(25, 93, 175);
  doc.line(40, 105, 170, 105);
  
  // Add certificate content
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  doc.text('This is to certify that', 105, 125, { align: 'center' });
  
  // Add name in larger, bold font
  doc.setFontSize(20);
  doc.setTextColor(25, 93, 175);
  doc.text(data.fullName, 105, 140, { align: 'center' });
  
  // Continue with certificate text
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  const text = [
    `Roll Number ${data.rollNumber}, is an alumnus/alumna of Dr B R Ambedkar National`,
    'Institute of Technology Jalandhar, having successfully completed their degree from the',
    `${data.department} Department in the year ${data.graduationYear}.`,
    '',
    `Currently, ${data.fullName} is working as ${data.designation}`,
    `at ${data.currentOrganization}.`
  ];
  
  doc.text(text, 105, 155, { align: 'center' });
  
  // Add verification details
  doc.setFontSize(10);
  doc.text(`Certificate ID: ${data.requestId}`, 20, 230);
  doc.text(`Issue Date: ${new Date().toLocaleDateString()}`, 20, 237);
  
  // Add signature sections
  doc.setFontSize(11);
  doc.text('_____________________', 50, 260);
  doc.text('Dean of Alumni Affairs', 45, 270);
  
  doc.text('_____________________', 160, 260);
  doc.text('Director', 150, 270);
  
  // Add footer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('This certificate is electronically generated and does not require physical signature.', 105, 285, { align: 'center' });
  
  // Save the PDF
  doc.save(`NITJ-Alumni-Certificate-${data.requestId}.pdf`);
};