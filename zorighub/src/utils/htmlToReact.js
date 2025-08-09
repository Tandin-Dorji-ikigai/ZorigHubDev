// Utility to convert HTML content to React components
import React from 'react';

export const convertHtmlToReact = (htmlContent, componentName) => {
  // Remove DOCTYPE and html/head tags, keep only body content
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;
  
  // Convert HTML attributes to React props
  let reactContent = bodyContent
    // Convert class to className
    .replace(/class=/g, 'className=')
    // Convert onclick to onClick
    .replace(/onclick=/g, 'onClick=')
    // Convert onchange to onChange
    .replace(/onchange=/g, 'onChange=')
    // Convert for to htmlFor
    .replace(/\sfor=/g, ' htmlFor=')
    // Convert self-closing tags
    .replace(/<input([^>]*?)>/g, '<input$1 />')
    .replace(/<img([^>]*?)>/g, '<img$1 />')
    .replace(/<br>/g, '<br />')
    .replace(/<hr>/g, '<hr />')
    // Convert style attributes to objects (basic conversion)
    .replace(/style="([^"]*?)"/g, (match, styles) => {
      const styleObj = styles.split(';')
        .filter(style => style.trim())
        .map(style => {
          const [prop, value] = style.split(':').map(s => s.trim());
          const camelCaseProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          return `${camelCaseProp}: '${value}'`;
        })
        .join(', ');
      return `style={{${styleObj}}}`;
    });

  return `
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ApiService from '../../services/api';

const ${componentName} = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    // Initialize any JavaScript functionality here
    // Convert original JavaScript to React hooks and event handlers
  }, []);

  return (
    <div>
      ${reactContent}
    </div>
  );
};

export default ${componentName};
`;
};

export const extractScripts = (htmlContent) => {
  const scriptMatches = htmlContent.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
  return scriptMatches ? scriptMatches.map(script => {
    const srcMatch = script.match(/src="([^"]*?)"/);
    const inlineMatch = script.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    return {
      src: srcMatch ? srcMatch[1] : null,
      content: inlineMatch ? inlineMatch[1] : null
    };
  }) : [];
};

export const extractStyles = (htmlContent) => {
  const styleMatches = htmlContent.match(/<link[^>]*rel="stylesheet"[^>]*>/gi);
  const inlineStyleMatches = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  
  return {
    external: styleMatches ? styleMatches.map(link => {
      const hrefMatch = link.match(/href="([^"]*?)"/);
      return hrefMatch ? hrefMatch[1] : null;
    }).filter(Boolean) : [],
    inline: inlineStyleMatches ? inlineStyleMatches.map(style => {
      const contentMatch = style.match(/<style[^>]*>([\s\S]*?)<\/style>/);
      return contentMatch ? contentMatch[1] : null;
    }).filter(Boolean) : []
  };
};

