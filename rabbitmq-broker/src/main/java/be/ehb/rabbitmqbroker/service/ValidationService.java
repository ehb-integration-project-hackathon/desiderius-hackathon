package be.ehb.rabbitmqbroker.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.xml.XMLConstants;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.File;
import java.io.StringReader;

@Service
public class ValidationService {

    public boolean validateXmlUser(String xml) throws Exception {
        try {
            // Load XSD file from resources folder
            File xsdFile = new ClassPathResource("validationUser.xsd").getFile();

            // Create a SchemaFactory capable of understanding WXS schemas
            SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);

            // Load a WXS schema, represented by a Schema instance
            Schema schema = factory.newSchema(xsdFile);

            // Create a Validator instance, which can be used to validate an instance document
            Validator validator = schema.newValidator();

            // Validate the XML
            validator.validate(new StreamSource(new StringReader(xml)));
            return true; // XML is valid
        } catch (Exception e) {
            // Log the exception or handle it as required
            e.printStackTrace();
            return false; // XML is invalid due to error
        }
    }
}
