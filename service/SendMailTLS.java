package com.partek.mail;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfDiv.BorderTopStyle;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.partek.ServiceApplicationConfig;
import com.partek.model.ServiceForm;

@Component
public class SendMailTLS {
	@Autowired
	ServiceApplicationConfig config;
	
	//String basePath = "C:\\Users\\software\\Desktop\\data\\";
	String logoPath;
	public String send(ServiceForm form, List<String> emails) {
		logoPath = config.temppath + "/logo.png";
		
		final String username = "teknikservis@partekbilisim.com";
		final String password = "T.2016*";

		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "false");
		props.put("mail.smtp.host", "mail.partekbilisim.com");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});

		String toEmail = "erhandulger16@gmail.com,e.dulger@partekbilisim.com,sezerdulger@gmail.com,";
		for (String email : emails) {
			toEmail += email + ",";
		}
		
		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("teknikservis@partekbilisim.com"));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
			message.setSubject("Service Formu");

			// Create the message part
			BodyPart messageBodyPart = new MimeBodyPart();

			// Now set the actual message
			messageBodyPart.setText("Bu Service Formu Partek tarafýndan gönderildi.");

			// Create a multipar message
			Multipart multipart = new MimeMultipart();

			// Set text message part
			multipart.addBodyPart(messageBodyPart);

			// Part two is attachment
			messageBodyPart = new MimeBodyPart();
			//String excel = this.getClass().getClassLoader().getResource("data/form.xls").getPath();
			//String excel = basePath + "form.xls";
			String filename = "";
			try {
				// filename = excel2pdf(excel);
				filename = createServiceForm(form);
			} catch (Exception e) {
				e.printStackTrace();
			}
			DataSource source = new FileDataSource(filename);
			messageBodyPart.setDataHandler(new DataHandler(source));
			messageBodyPart.setFileName(filename);
			multipart.addBodyPart(messageBodyPart);

			// Send the complete message parts
			message.setContent(multipart);

			Transport.send(message);

			return "1";

		} catch (Exception e) {
			return e.getMessage();
		}
	}
	/*
	 * public void sendssl() { Properties props = new Properties();
	 * props.put("mail.smtp.host", "smtp.gmail.com");
	 * props.put("mail.smtp.socketFactory.port", "465");
	 * props.put("mail.smtp.socketFactory.class",
	 * "javax.net.ssl.SSLSocketFactory"); props.put("mail.smtp.auth", "true");
	 * props.put("mail.smtp.port", "465");
	 * 
	 * Session session = Session.getDefaultInstance(props, new
	 * javax.mail.Authenticator() { protected PasswordAuthentication
	 * getPasswordAuthentication() { return new
	 * PasswordAuthentication("sezerdulger@gmail.com","sezdul132466311"); } });
	 * 
	 * try {
	 * 
	 * Message message = new MimeMessage(session); message.setFrom(new
	 * InternetAddress("sezerdulger@gmail.com"));
	 * message.setRecipients(Message.RecipientType.TO,
	 * InternetAddress.parse("erhandulger16@gmail.com")); message.setSubject(
	 * "Testing Subject"); message.setText("Deneme maili");
	 * 
	 * Transport.send(message);
	 * 
	 * System.out.println("Done");
	 * 
	 * } catch (MessagingException e) { throw new RuntimeException(e); } }
	 */

	public String excel2pdf(String excel) throws Exception {
		String path = "C:\\test.pdf";
		FileInputStream input_document = new FileInputStream(new File(excel));
		// Read workbook into HSSFWorkbook
		HSSFWorkbook my_xls_workbook = new HSSFWorkbook(input_document);
		// Read worksheet into HSSFSheet
		HSSFSheet my_worksheet = my_xls_workbook.getSheetAt(0);
		// To iterate over the rows
		// We will create output PDF document objects at this point
		Document iText_xls_2_pdf = new Document();
		PdfWriter.getInstance(iText_xls_2_pdf, new FileOutputStream(path));
		iText_xls_2_pdf.open();
		// we have two columns in the Excel sheet, so we create a PDF table with
		// two columns
		// Note: There are ways to make this dynamic in nature, if you want to.
		PdfPTable my_table = new PdfPTable(7);
		// We will use the object below to dynamically add new data to the table
		PdfPCell table_cell;
		// Loop through rows.
		// Decide which rows to process
		int rowStart = Math.min(0, my_worksheet.getFirstRowNum());
		int rowEnd = Math.max(25, my_worksheet.getLastRowNum());

		for (int rowNum = rowStart; rowNum < rowEnd; rowNum++) {
			Row r = my_worksheet.getRow(rowNum);
			if (r == null) {
				// This whole row is empty
				// Handle it as needed
				continue;
			}

			int lastColumn = Math.max(r.getLastCellNum(), 7);

			for (int cn = 0; cn < lastColumn; cn++) {
				Cell c = r.getCell(cn, Row.RETURN_BLANK_AS_NULL);
				if (c == null) {
					table_cell = new PdfPCell(new Phrase(" "));
					// feel free to move the code below to suit to your needs
					my_table.addCell(table_cell);
				} else {
					table_cell = new PdfPCell(new Phrase(c.getStringCellValue()));
					// feel free to move the code below to suit to your needs
					my_table.addCell(table_cell);
				}
			}
		}
		// Finally add the table to PDF document
		iText_xls_2_pdf.add(my_table);
		iText_xls_2_pdf.close();
		// we created our pdf file..
		input_document.close(); // close xls
		return path;
	}

	public String createServiceForm(ServiceForm form) throws Exception {
		String path = config.temppath + "test.pdf";
		Document document = new Document();
		
		PdfWriter.getInstance(document, new FileOutputStream(path));
		document.open();
		document.setMargins(2, 2, 2, 2);
		// we have two columns in the Excel sheet, so we create a PDF table with
		// two columns
		// Note: There are ways to make this dynamic in nature, if you want to.
		int colNumber = 20;
		PdfPTable my_table = new PdfPTable(colNumber);
		my_table.setWidthPercentage(98);
		// We will use the object below to dynamically add new data to the table
		PdfPCell table_cell;

		int arrayCol = 0;
		int emptyLines1 = 15;
		int emptyLines2 = 15;
		
		
		//String logo = this.getClass().getClassLoader().getResource("data/logo.png").getPath();
		
		String address = "PARTEK BiLÝÞÝM ÝLETÝÞÝM ELEKTRONÝK TEKNOLOJÝ SAN. VE TÝC.LTD.ÞTÝ.\n";
		address+="Konak Mh. Yýldýrým Cd. Karadut Sk. GençArslanlar Ýþ Merkezi No:152\n";
		address+="Kat.3 Daire.42 Nilüfer/BURSA\n";
		address+="info@partekbilisim.com Teknik Servis Tel.(224) 452 53 83";
		
		FormColSpans[] rows = new FormColSpans[40];
		rows[arrayCol] = new FormColSpans(arrayCol, 2, new int[] { 35, 65 }, 
				new Object[] { Image.getInstance(logoPath), address }, new int[]{Element.ALIGN_LEFT, Element.ALIGN_RIGHT}, 7.0f,
				new Border[]{new Border(0, 0, 0, 0), new Border(0, 0, 0, 0)});
		rows[++arrayCol] = new FormColSpans(arrayCol, 1, new int[] { 100 }, new Object[] { "SERVÝS FORMU" }, new int[]{Element.ALIGN_CENTER});
		rows[++arrayCol] = new FormColSpans(arrayCol, 4, new int[] { 20, 35, 20, 25 },
				new Object[] { "Firma Adý Ünvaný", form.getCustomerTitle() != null ? form.getCustomerTitle() : "", 
						"Talep Tarihi", form.getRequestDate() != null ? form.getRequestDate() : "" });
		rows[++arrayCol] = new FormColSpans(arrayCol, 4, new int[] { 20, 35, 20, 25 },
				new Object[] { "Departman", form.getDepartment() != null ? form.getDepartment() : "", 
						"Randevu Tarihi", form.getMeetingDate() != null ? form.getMeetingDate() : "" });
		rows[++arrayCol] = new FormColSpans(arrayCol, 4, new int[] { 20, 35, 20, 25 }, new Object[] { 
				"Adres", form.getAddress() != null ? form.getAddress() : "", 
				"Hizmet Tarihi", form.getServiceDate() != null ? form.getServiceDate() : "" });
		rows[++arrayCol] = new FormColSpans(arrayCol, 4, new int[] { 20, 35, 20, 25 }, new Object[] { 
				" ", " ", "Hizmet Tipi", form.getServiceType() != null ? form.getServiceType() : ""});
		rows[++arrayCol] = new FormColSpans(arrayCol, 4, new int[] { 20, 35, 20, 25 }, new Object[] { 
				"Telefon", form.getTel() != null ? form.getTel() : "", 
						"Kapsam", form.getScope() != null ? form.getScope() : "" });
		String emails = "";
		if (form.getEmails() != null) {
			for (int j = 0; j < form.getEmails().size(); j++) {
				emails += form.getEmails().get(j);
				if (j != form.getEmails().size() - 1) {
					emails += ", ";
				}
			}
		}
		rows[++arrayCol] = new FormColSpans(arrayCol, 4, new int[] { 20, 35, 20, 25 }, new Object[] { "E-Mail", emails, " ", " " });
		rows[++arrayCol] = new FormColSpans(arrayCol, 2, new int[] { 60, 40 },
				new Object[] { "TALEP EDÝLEN HÝZMETÝN TANIMI", "KULLANILAN MALZEME" }, new int[]{Element.ALIGN_CENTER, Element.ALIGN_CENTER});
		for (int i = 1; i < emptyLines1; i++) {
			rows[i + arrayCol] = new FormColSpans(i + arrayCol, 2, new int[] { 60, 40 }, new Object[] { " ", " " });
		}
		arrayCol = emptyLines1 + arrayCol - 1;
		rows[++arrayCol] = new FormColSpans(arrayCol, 1, new int[] { 100 }, new Object[] { 
				"YAPILAN HÝZMETÝN AÇIKLAMASI" }, new int[]{Element.ALIGN_CENTER});
		
		rows[++arrayCol] = new FormColSpans(arrayCol, 1, new int[] { 100 }, new Object[] { 
		form.getServiceDescription() != null ? form.getServiceDescription() : "" });

		for (int i = 1; i < emptyLines2 - 1; i++) {
			rows[i + arrayCol - 1] = new FormColSpans(i + arrayCol, 1, new int[] { 100 }, new Object[] { " " });
		}
		arrayCol = emptyLines2 + arrayCol - 3;//TODO 2 means 1 line is written
		
		String hours = "Baslangýç Saati: " + (form.getStartTime() != null ? form.getStartTime() : "");
		hours += "\nBitiþ Saati: " + (form.getFinishTime() != null ? form.getFinishTime() : "");
		hours += "\nSüre: " + (form.getDuration() != null ? form.getDuration() : "");
		hours += "\nSaat Ücreti: " + (form.getHourlyRate() != null ? form.getHourlyRate() : "");
		rows[++arrayCol] = new FormColSpans(arrayCol, 4, new int[] { 30, 30, 20, 20 },
				new Object[] { hours, "Hizmeti Veren PARTEK Personeli\n" + form.getEmployee() != null ? form.getEmployee().getFullname() : "\n\n", 
						"Firma Kaþe Ýmza\n\n\n\n\n\n",
						"Hizmeti Alan\nFirma Personeli\n\n" });
		rows[++arrayCol] = new FormColSpans(arrayCol, 1, new int[] { 100 }, new Object[] { "altyazý" });

		for (FormColSpans row : rows) {
			int i = 0;
			for (int j = 0; j < row.items.length; j++) {
				Object item = row.items[j];
			
				table_cell = null;
				if (item == null) {
					BaseFont bf = BaseFont.createFont( BaseFont.TIMES_ROMAN, "Cp857", BaseFont.EMBEDDED );
					Font f1 = new Font(bf, row.size);
					table_cell = new PdfPCell(new Phrase(new Paragraph("", f1)));
				}
				else if (item.getClass().equals(String.class) || item.getClass().equals(Paragraph.class)) {
					BaseFont bf = BaseFont.createFont( BaseFont.TIMES_ROMAN, "Cp857", BaseFont.EMBEDDED );
					Font f1 = new Font(bf, row.size);
					table_cell = new PdfPCell(new Phrase(new Paragraph(item.toString(), f1)));
				}
				else if (item.getClass().equals(com.itextpdf.text.ImgRaw.class)){
					table_cell = new PdfPCell((Image)item, true);
				}
				else if (item.getClass().equals(Date.class)) {
					BaseFont bf = BaseFont.createFont( BaseFont.TIMES_ROMAN, "Cp857", BaseFont.EMBEDDED );
					Font f1 = new Font(bf, row.size);
					SimpleDateFormat dt = new SimpleDateFormat("dd-MM-yyyy");
					table_cell=new PdfPCell(new Phrase(new Paragraph(dt.format(item), f1)));
				}
				table_cell.setColspan(row.colSpans[j] *colNumber / 100);
				table_cell.setHorizontalAlignment(row.aligns[j]);
				table_cell.setPaddingBottom(2.0f);
				if (row.borders != null) {
					table_cell.setBorderWidthLeft(row.borders[j].borderLeftWidth);
					table_cell.setBorderWidthRight(row.borders[j].borderRightWidth);
					table_cell.setBorderWidthTop(row.borders[j].borderTopWidth);
					table_cell.setBorderWidthBottom(row.borders[j].borderBottomWidth);
				}
				my_table.addCell(table_cell);
				++i;
			}
		}

		// Finally add the table to PDF document
		document.add(my_table);
		document.close();
		// we created our pdf file..

		return path;
	}

	private class FormColSpans {
		public int itemSize;
		public int rowNumber;
		public int[] colSpans;
		public Object[] items;
		public int[] aligns;
		public float size = 10.0f;
		public Border[] borders = null;

		public FormColSpans(int rowNumber, int itemSize, int[] colSpans, Object[] items, int[] aligns) {
			this(rowNumber, itemSize, colSpans, items);
			this.aligns = aligns;
		}
		
		public FormColSpans(int rowNumber, int itemSize, int[] colSpans, Object[] items) {
			this.rowNumber = rowNumber;
			this.itemSize = itemSize;
			this.colSpans = colSpans;
			this.items = items;
			
			this.aligns = new int[this.items.length];
			
			for (int i = 0; i < items.length; i++) {
				this.aligns[i] = Element.ALIGN_LEFT;
			}
		}
		
		public FormColSpans(int rowNumber, int itemSize, int[] colSpans, Object[] items, int[] aligns, float size) {
			this(rowNumber, itemSize, colSpans, items, aligns);
			this.size = size;
		}
		
		public FormColSpans(int rowNumber, int itemSize, int[] colSpans, Object[] items, int[] aligns, float size, Border[] borders) {
			this(rowNumber, itemSize, colSpans, items, aligns);
			this.size = size;
			this.borders = borders;
		}
	}
	
	private class Border {
		public int borderLeftWidth = 1;
		public int borderRightWidth = 1;
		public int borderTopWidth = 1;
		public int borderBottomWidth = 1;
		
		public BorderTopStyle borderLeftStyle = BorderTopStyle.SOLID;
		public BorderTopStyle borderRightStyle = BorderTopStyle.SOLID;
		public BorderTopStyle borderTopStyle = BorderTopStyle.SOLID;
		public BorderTopStyle borderBottomStyle = BorderTopStyle.SOLID;
		
		public Border() {
			
		}
		
		public Border(int borderLeftWidth, int borderRightWidth, int borderTopWidth, int borderBottomWidth) {
			this.borderLeftWidth = borderLeftWidth;
			this.borderRightWidth = borderRightWidth;
			this.borderTopWidth = borderTopWidth;
			this.borderBottomWidth = borderBottomWidth;
		}
		
		public Border(BorderTopStyle borderLeftStyle, BorderTopStyle borderRightStyle, BorderTopStyle borderTopStyle, BorderTopStyle borderBottomStyle) {
			this.borderLeftStyle = borderLeftStyle;
			this.borderRightStyle = borderRightStyle;
			this.borderTopStyle = borderTopStyle;
			this.borderBottomStyle = borderBottomStyle;
		}
		public Border(int borderLeftWidth, int borderRightWidth, int borderTopWidth, int borderBottomWidth, BorderTopStyle borderLeftStyle, BorderTopStyle borderRightStyle, BorderTopStyle borderTopStyle, BorderTopStyle borderBottomStyle) {
			this(borderLeftWidth, borderRightWidth, borderTopWidth, borderBottomWidth);
			this.borderLeftStyle = borderLeftStyle;
			this.borderRightStyle = borderRightStyle;
			this.borderTopStyle = borderTopStyle;
			this.borderBottomStyle = borderBottomStyle;
		}
	}
}
