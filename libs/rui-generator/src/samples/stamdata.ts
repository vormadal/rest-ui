import { OpenAPIV3 } from 'openapi-types';

export const StamdataDocument: OpenAPIV3.Document<{
  'x-ski-cache-max-age'?: number;
}> = {
  components: {
    schemas: {
      reportingResponsibleDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
        },
      },
      faqListViewDto: {
        type: 'object',
        properties: {
          agreementId: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          question: {
            type: 'string',
          },
          answer: {
            type: 'string',
          },
        },
      },
      agreementCustomerSummary: {
        type: 'object',
        properties: {
          agreementId: {
            type: 'string',
          },
          endDateUtc: {
            type: 'string',
            format: 'date-time',
          },
          terminationDateUtc: {
            type: 'string',
            format: 'date-time',
          },
          subAgreementSummary: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/agreementCustomerSummary',
            },
          },
        },
      },
      reportingRequirementAgreementDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          href: {
            type: 'string',
          },
          mainAgreementId: {
            type: 'string',
          },
        },
      },
      nextMilestoneListViewDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          skiStartdateUtc: {
            type: 'string',
          },
          skiAlternavtivenenddate: {
            type: 'string',
          },
        },
      },
      skiStatusupdate: {
        type: 'object',
        properties: {
          skiStatusupdateId: {
            type: 'string',
            format: 'uuid',
          },
          skiName: {
            type: 'string',
          },
          skiRequireslogin: {
            type: 'boolean',
            nullable: true,
          },
          skiRequiresloginName: {
            type: 'string',
          },
          skiStartdate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          skiEnddate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          skiApproval: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          skiApprovalName: {
            type: 'string',
          },
          skiText: {
            type: 'string',
          },
          skiStatusupdateautoid: {
            type: 'string',
          },
          skiStatusupdatecategory: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          skiStatusupdatecategoryName: {
            type: 'string',
          },
          abaGenudsendelse: {
            type: 'boolean',
            nullable: true,
          },
          abaGenudsendelseName: {
            type: 'string',
          },
          abaPreheader: {
            type: 'string',
          },
          abaEmailtemplateId: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          abaEmailtemplateIdName: {
            type: 'string',
          },
          abaRelateredeSkiaftalerhtml: {
            type: 'string',
          },
          abaStausopdateringurl: {
            type: 'string',
          },
          deletedOn: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          deletedBy: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          createdOn: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          createdBy: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          modifiedOn: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          modifiedBy: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          createdOnBehalfBy: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          modifiedOnBehalfBy: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          createdByName: {
            type: 'string',
          },
          createdByYomiName: {
            type: 'string',
          },
          createdOnBehalfByName: {
            type: 'string',
          },
          createdOnBehalfByYomiName: {
            type: 'string',
          },
          modifiedByName: {
            type: 'string',
          },
          modifiedByYomiName: {
            type: 'string',
          },
          modifiedOnBehalfByName: {
            type: 'string',
          },
          modifiedOnBehalfByYomiName: {
            type: 'string',
          },
          organizationId: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          organizationIdName: {
            type: 'string',
          },
          statecode: {
            type: 'string',
          },
          statecodeName: {
            type: 'string',
          },
          statuscode: {
            type: 'string',
          },
          statuscodeName: {
            type: 'string',
          },
          versionNumber: {
            type: 'integer',
            format: 'int64',
            nullable: true,
          },
          importSequenceNumber: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          overriddenCreatedOn: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          timeZoneRuleVersionNumber: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          utcconversionTimeZoneCode: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          requestId: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
        },
      },
      reportingRequirementsWrapper: {
        type: 'object',
        properties: {
          reportingRequirements: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/reportingRequirementDto',
            },
          },
          contacts: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/reportingResponsibleDto',
            },
          },
        },
      },
      skiResponsibleListViewDto: {
        type: 'object',
        properties: {
          role: {
            type: 'string',
          },
          contact: {
            $ref: '#/components/schemas/contactListViewDto',
          },
          orderNumber: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          skiStartdato: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          skiSlutdato: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
        },
      },
      organizationListViewDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          addressName: {
            type: 'string',
          },
          street: {
            type: 'string',
          },
          postalcode: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
          country: {
            type: 'string',
          },
          mail: {
            type: 'string',
          },
          cvr: {
            type: 'string',
          },
          vat: {
            type: 'string',
          },
          website: {
            type: 'string',
          },
          role: {
            type: 'string',
          },
          ean: {
            type: 'string',
          },
          secretary: {
            $ref: '#/components/schemas/secretaryDto',
          },
          groups: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/groupListViewDto',
            },
          },
          agreement: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/agreementsForOrganizationListViewDto',
            },
          },
          supplier: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/supplierForOrganizationListViewDto',
            },
          },
          subscriptionType: {
            type: 'string',
          },
          subscriptionStartDate: {
            type: 'string',
          },
          projectGroup: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/projectGroupListViewDto',
            },
          },
          shoppingCommunity: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/shoppingCommunityForCustomerList',
            },
          },
          sourcingPrograms: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/sourcingprogramListViewDto',
            },
          },
        },
      },
      organizationSupplierReport: {
        type: 'object',
        properties: {
          reportingCode: {
            type: 'integer',
            format: 'int32',
          },
          supplierReportStartDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          supplierReportEndDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          paymentTermsCode: {
            type: 'string',
          },
          navisionProjectCode: {
            type: 'string',
          },
          sharePerUnit: {
            type: 'number',
            format: 'double',
            nullable: true,
          },
          sharePercent: {
            type: 'number',
            format: 'double',
            nullable: true,
          },
          autoApproveReports: {
            type: 'boolean',
          },
        },
      },
      calendarListItemDto: {
        type: 'object',
        properties: {
          subject: {
            type: 'string',
          },
          startDateUtc: {
            type: 'string',
          },
          alternateDisplayDate: {
            type: 'string',
          },
          teaser: {
            type: 'string',
          },
        },
      },
      agreementDocumentsListViewDto: {
        type: 'object',
        properties: {
          agreementId: {
            type: 'string',
          },
          documentId: {
            type: 'string',
          },
          fileName: {
            type: 'string',
          },
          documentType: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          isLoginRequired: {
            type: 'boolean',
          },
          documentTypeSortingNumber: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          sortingNumber: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          authorized: {
            type: 'boolean',
          },
        },
      },
      customerApplicationListViewDto: {
        type: 'object',
        properties: {
          organizationId: {
            type: 'string',
          },
          connectiontext: {
            type: 'string',
          },
          startdateUtc: {
            type: 'string',
          },
          enddateUtc: {
            type: 'string',
          },
          applicationType: {
            type: 'string',
          },
          applicationLabel: {
            type: 'string',
          },
          applicationDescription: {
            type: 'string',
          },
          endOfLateSignUpPeriod: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
        },
      },
      employeeListViewDtoWrapper: {
        type: 'object',
        properties: {
          skiEmployeesList: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/employeeListViewDto',
            },
          },
          skiTeamlist: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/teamListViewDto',
            },
          },
        },
      },
      supplierListViewDtoWrapper: {
        type: 'object',
        properties: {
          suppliers: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/enrichedSupplierListViewDto',
            },
          },
        },
      },
      supplierListViewDto: {
        type: 'object',
        properties: {
          supplierName: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          supplyRoles: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/supplyRoleListViewDto',
            },
          },
          organizationId: {
            type: 'string',
          },
          cvrNummer: {
            type: 'string',
          },
        },
      },
      projectGroupListViewDto: {
        type: 'object',
        properties: {
          agreementId: {
            type: 'string',
          },
          agreementName: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          jobTitle: {
            type: 'string',
          },
          company: {
            type: 'string',
          },
          telephone: {
            type: 'string',
          },
          mail: {
            type: 'string',
          },
          organizationId: {
            type: 'string',
          },
          customerName: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          shoppingCommunity: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/shoppingCommunityListViewDto',
            },
          },
        },
      },
      entityTagHeaderValue: {
        type: 'object',
        properties: {
          tag: {
            $ref: '#/components/schemas/stringSegment',
          },
          isWeak: {
            type: 'boolean',
          },
        },
      },
      agreementReplacesListViewDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          id: {
            type: 'string',
          },
        },
      },
      greenFilterDto: {
        type: 'object',
        properties: {
          filterId: {
            type: 'string',
          },
          filterValues: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      statusUpdatesRequest: {
        required: ['aftids'],
        type: 'object',
        properties: {
          aftids: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      statusUpdateViewDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          category: {
            type: 'string',
          },
          startDateUtc: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          agreements: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/agreementListStatusUpdateDto',
            },
          },
        },
      },
      agreementListViewDtoWrapper: {
        type: 'object',
        properties: {
          skiAgreementlist: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/agreementListViewDto',
            },
          },
          skiGroups: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/groupListViewDto',
            },
          },
          skiSourcingprograms: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/sourcingprogramListViewDto',
            },
          },
          skiOverallStatuses: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/skiOverallstatusListViewDto',
            },
          },
        },
      },
      agreementStatusUpdateDto: {
        type: 'object',
        properties: {
          statusUpdate: {
            $ref: '#/components/schemas/skiStatusupdate',
          },
          id: {
            type: 'string',
          },
          dateUtc: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          category: {
            type: 'string',
          },
        },
      },
      shoppingCommunityForCustomerList: {
        type: 'object',
        properties: {
          organization: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          organizationId: {
            type: 'string',
          },
        },
      },
      organizationAgreementList: {
        type: 'object',
        properties: {
          agreements: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/organizationAgreement',
            },
          },
        },
      },
      descriptionListViewDto: {
        type: 'object',
        properties: {
          agreementDescriptionName: {
            type: 'string',
          },
          orderByNumber: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          agreementDescriptionText: {
            type: 'string',
          },
        },
      },
      supplyRoleListViewDto: {
        type: 'object',
        properties: {
          role: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          phone: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          jobTitle: {
            type: 'string',
          },
        },
      },
      subagreementListViewDto: {
        type: 'object',
        properties: {
          displayNameLong: {
            type: 'string',
          },
          subAgreementName: {
            type: 'string',
          },
          subAgreementNumber: {
            type: 'string',
          },
          subAgreementId: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          keywords: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/keywordDto',
            },
          },
          overallStatusName: {
            type: 'string',
          },
          customerApplication: {
            $ref: '#/components/schemas/customerApplicationListViewDto',
          },
          skiNextMilestone: {
            $ref: '#/components/schemas/nextMilestoneListViewDto',
          },
          alternateDisplayDate: {
            type: 'string',
          },
          expectedIntoForceAlternateDisplayDate: {
            type: 'string',
          },
          expectedIntoForceStartDateUtc: {
            type: 'string',
          },
          intoForceDateUtc: {
            type: 'string',
          },
          showOnAgreement: {
            type: 'boolean',
            nullable: true,
          },
          phase: {
            type: 'string',
          },
          eCatalogOnAgreement: {
            type: 'boolean',
            nullable: true,
          },
          name: {
            type: 'string',
          },
          nameWithYear: {
            type: 'string',
          },
          frameworkAgreementAreaNumber: {
            type: 'string',
          },
          frameworkAgreementNumber: {
            type: 'string',
          },
          partialAgreementNumber: {
            type: 'string',
          },
          frameworkAgreementYear: {
            type: 'string',
          },
          combinedAgreementNumber: {
            type: 'string',
          },
          agreementId: {
            type: 'string',
          },
          expirationDate: {
            type: 'string',
            format: 'date',
            nullable: true,
          },
          expirationIncOptionsDate: {
            type: 'string',
            format: 'date',
            nullable: true,
          },
          showDisButton: {
            type: 'boolean',
          },
          disButtonUrl: {
            type: 'string',
          },
          disButtonText: {
            type: 'string',
          },
        },
      },
      skiOverallstatusListViewDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
        },
      },
      groupListViewDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
        },
      },
      agreementListViewDto: {
        type: 'object',
        properties: {
          agreementId: {
            type: 'string',
          },
          agreementGuid: {
            type: 'string',
          },
          displayNameLong: {
            type: 'string',
          },
          displayNameShort: {
            type: 'string',
          },
          phase: {
            type: 'string',
          },
          group: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          displayNumbers: {
            type: 'string',
          },
          intoForceDateUtc: {
            type: 'string',
          },
          expirationDateUtc: {
            type: 'string',
          },
          expirationDateMaxUtc: {
            type: 'string',
          },
          overallStatusName: {
            type: 'string',
          },
          latestStatusUpdateUtc: {
            type: 'string',
          },
          alternateDisplayDate: {
            type: 'string',
          },
          expectedIntoForceAlternateDisplayDate: {
            type: 'string',
          },
          expectedIntoForceStartDateUtc: {
            type: 'string',
          },
          catalogue: {
            type: 'boolean',
          },
          greenCatalogue: {
            type: 'boolean',
          },
          eCatalogOnAgreement: {
            type: 'boolean',
            nullable: true,
          },
          skiNextMilestone: {
            $ref: '#/components/schemas/nextMilestoneListViewDto',
          },
          sourcingPrograms: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/sourcingprogramListViewDto',
            },
          },
          subagreement: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/subagreementListViewDto',
            },
          },
          url: {
            type: 'string',
          },
          customerApplication: {
            $ref: '#/components/schemas/customerApplicationListViewDto',
          },
          calendars: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/calendarDbDto',
            },
          },
        },
      },
      organizationSearchDto: {
        type: 'object',
        properties: {
          organizationId: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          cvrNumber: {
            type: 'string',
          },
          eanNumber: {
            type: 'string',
          },
          street: {
            type: 'string',
          },
          postalCode: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
        },
      },
      secretaryDto: {
        type: 'object',
        properties: {
          organizationId: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
        },
      },
      agreementListStatusUpdateDto: {
        type: 'object',
        properties: {
          agreementId: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          displayNameShort: {
            type: 'string',
          },
          displayNumbers: {
            type: 'string',
          },
          expirationDateUtc: {
            type: 'string',
          },
          overallStatusName: {
            type: 'string',
          },
          agreementURL: {
            type: 'string',
          },
        },
      },
      agreementDto: {
        type: 'object',
        properties: {
          mainAgreementName: {
            type: 'string',
          },
          mainAgreementId: {
            type: 'string',
          },
          agreementNumber: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
          finalDateUtc: {
            type: 'string',
          },
          externalLink: {
            type: 'string',
          },
          agreementMainNumber: {
            type: 'string',
          },
          guid: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          type: {
            type: 'string',
          },
          intoForceDateUtc: {
            type: 'string',
          },
          expectedIntoForceAlternateDisplayDate: {
            type: 'string',
          },
          expectedIntoForceStartDateUtc: {
            type: 'string',
          },
          group: {
            type: 'string',
          },
          agreementYearNumber: {
            type: 'string',
          },
          displayNameLong: {
            type: 'string',
          },
          agreementSubNumber: {
            type: 'string',
          },
          displayNameShort: {
            type: 'string',
          },
          expirationDateUtc: {
            type: 'string',
          },
          previewDateUtc: {
            type: 'string',
          },
          tenderProcess: {
            type: 'string',
          },
          expirationDateMaxUtc: {
            type: 'string',
          },
          link: {
            type: 'string',
          },
          phase: {
            type: 'string',
          },
          displayNumbers: {
            type: 'string',
          },
          overallStatusName: {
            type: 'string',
          },
          origin: {
            type: 'string',
          },
          catalogue: {
            type: 'boolean',
          },
          greenCatalogue: {
            type: 'boolean',
          },
          eCatalogOnAgreement: {
            type: 'boolean',
            nullable: true,
          },
          expirationDateCest: {
            type: 'string',
          },
          expirationDateMaxCest: {
            type: 'string',
          },
          finalDateCest: {
            type: 'string',
          },
          textForSuppliers: {
            type: 'string',
          },
          textForCustomers: {
            type: 'string',
          },
          option: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/crmSkiExtensionListViewDto',
            },
          },
          responsibles: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/skiResponsibleListViewDto',
            },
          },
          subAgreement: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/subagreementListViewDto',
            },
          },
          projectGroup: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/projectGroupListViewDto',
            },
          },
          calendar: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/calendarListItemDto',
            },
          },
          document: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/agreementDocumentsListViewDto',
            },
          },
          successors: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/agreementReplacesListViewDto',
            },
          },
          presuccessors: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/agreementReplacesListViewDto',
            },
          },
          supplierList: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/supplierListViewDto',
            },
          },
          customerApplication: {
            $ref: '#/components/schemas/customerApplicationListViewDto',
          },
          relatedAgreements: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/relatedAgreementsListViewDto',
            },
          },
          keywords: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/keywordDto',
            },
          },
          greenFilters: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/greenFilterDto',
            },
          },
          approvals: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/skiApprovalsListViewDto',
            },
          },
          descriptionShortcuts: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/agreementDescriptionShortcutsDto',
            },
          },
          name: {
            type: 'string',
          },
          nameWithYear: {
            type: 'string',
          },
          frameworkAgreementAreaNumber: {
            type: 'string',
          },
          frameworkAgreementNumber: {
            type: 'string',
          },
          partialAgreementNumber: {
            type: 'string',
          },
          frameworkAgreementYear: {
            type: 'string',
          },
          combinedAgreementNumber: {
            type: 'string',
          },
          agreementId: {
            type: 'string',
          },
          expirationDate: {
            type: 'string',
            format: 'date',
            nullable: true,
          },
          expirationIncOptionsDate: {
            type: 'string',
            format: 'date',
            nullable: true,
          },
          showDisButton: {
            type: 'boolean',
          },
          disButtonUrl: {
            type: 'string',
          },
          disButtonText: {
            type: 'string',
          },
        },
      },
      stringSegment: {
        type: 'object',
        properties: {
          buffer: {
            type: 'string',
          },
          offset: {
            type: 'integer',
            format: 'int32',
          },
          length: {
            type: 'integer',
            format: 'int32',
          },
          value: {
            type: 'string',
          },
          hasValue: {
            type: 'boolean',
          },
        },
      },
      shoppingCommunityListViewDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
        },
      },
      sourcingprogramListViewDto: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
        },
      },
      fileContentResult: {
        type: 'object',
        properties: {
          fileContents: {
            type: 'string',
            format: 'binary',
          },
          contentType: {
            type: 'string',
          },
          fileDownloadName: {
            type: 'string',
          },
          lastModified: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          entityTag: {
            $ref: '#/components/schemas/entityTagHeaderValue',
          },
          enableRangeProcessing: {
            type: 'boolean',
          },
        },
      },
      organizationAgreement: {
        type: 'object',
        properties: {
          mainAgreementId: {
            type: 'string',
          },
          mainAgreementDisplayNameShort: {
            type: 'string',
          },
          mainAgreementIntoForceDateUtc: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          agreementId: {
            type: 'string',
          },
          displayNameLong: {
            type: 'string',
          },
          displayNameShort: {
            type: 'string',
          },
          supplierReports: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/organizationSupplierReport',
            },
          },
          intoForceDateUtc: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
        },
      },
      reportingRequirementDto: {
        type: 'object',
        properties: {
          agreement: {
            $ref: '#/components/schemas/reportingRequirementAgreementDto',
          },
          startDate: {
            type: 'string',
          },
          endDate: {
            type: 'string',
          },
        },
      },
      contactListViewDto: {
        type: 'object',
        properties: {
          fullContactName: {
            type: 'string',
          },
          occupation: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          phone: {
            type: 'string',
          },
          linkToImage: {
            type: 'string',
          },
        },
      },
      agreement: {
        type: 'object',
        properties: {
          agreementId: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          displayNameLong: {
            type: 'string',
          },
          combinedAgreementNumber: {
            type: 'string',
          },
          overallStatusName: {
            type: 'string',
          },
          intoForceDateUtc: {
            type: 'string',
          },
          expectedIntoForceDateStartUtc: {
            type: 'string',
          },
          expirationDateUtc: {
            type: 'string',
          },
          eCatalogOnAgreement: {
            type: 'boolean',
            nullable: true,
          },
          url: {
            type: 'string',
          },
          suppliers: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/supplier',
            },
          },
        },
      },
      organizationDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          href: {
            type: 'string',
          },
          reportingRequirements: {
            $ref: '#/components/schemas/reportingRequirementsWrapper',
          },
        },
      },
      customerListApplicationViewDto: {
        type: 'object',
        properties: {
          applicationType: {
            type: 'string',
          },
          customerList: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/minifiedCustomerListViewDto',
            },
          },
        },
      },
      customerListDtoWrapper: {
        type: 'object',
        properties: {
          agreementid: {
            type: 'string',
          },
          customerListApplications: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/customerListApplicationViewDto',
            },
          },
        },
      },
      agreementsForOrganizationListViewDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          url: {
            type: 'string',
          },
          agreementId: {
            type: 'string',
          },
          displayNameLong: {
            type: 'string',
          },
          displayNameShort: {
            type: 'string',
          },
          intoForceDateUtc: {
            type: 'string',
          },
          expirationDateUtc: {
            type: 'string',
          },
          expirationDateMaxUtc: {
            type: 'string',
          },
          hearingStarted: {
            type: 'string',
          },
          hearingEnded: {
            type: 'string',
          },
          expectedForceStart: {
            type: 'string',
          },
          signupPeriode: {
            type: 'string',
          },
          expectedIntoForceAlternateDisplayDate: {
            type: 'string',
          },
          expectedIntoForceStartDateUtc: {
            type: 'string',
          },
          displayNumbers: {
            type: 'string',
          },
          phase: {
            type: 'string',
          },
          overallStatusName: {
            type: 'string',
          },
          latestStatusUpdateUtc: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          group: {
            type: 'string',
          },
          mainAgreementName: {
            type: 'string',
          },
          mainAgreementId: {
            type: 'string',
          },
          sourcingPrograms: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/sourcingprogramListViewDto',
            },
          },
          customerApplication: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/customerApplicationListViewDto',
            },
          },
          intoForceDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          expirationDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          contactPerson: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/contactPersonOrganizationListViewDto',
            },
          },
          supplierReporteportingCodes: {
            type: 'array',
            items: {
              type: 'integer',
              format: 'int32',
            },
          },
          supplierReports: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/supplierReportDto',
            },
          },
          terminationDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
        },
      },
      enrichedSupplierListViewDto: {
        type: 'object',
        properties: {
          agreementApprovals: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          supplierName: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          supplyRoles: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/supplyRoleListViewDto',
            },
          },
          organizationId: {
            type: 'string',
          },
          cvrNummer: {
            type: 'string',
          },
        },
      },
      supplierForOrganizationListViewDto: {
        type: 'object',
        properties: {
          organizationId: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          addressName: {
            type: 'string',
          },
          street: {
            type: 'string',
          },
          postalcode: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
          country: {
            type: 'string',
          },
          mail: {
            type: 'string',
          },
          cvr: {
            type: 'string',
          },
          website: {
            type: 'string',
          },
          role: {
            type: 'string',
          },
          ean: {
            type: 'string',
          },
        },
      },
      minifiedCustomerListViewDto: {
        type: 'object',
        properties: {
          companyname: {
            type: 'string',
          },
          applicationLabel: {
            type: 'string',
          },
          connectiontext: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          organizationId: {
            type: 'string',
          },
          agreementCustomerEnddate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
        },
      },
      skiAgreementRequest: {
        required: ['aftid'],
        type: 'object',
        properties: {
          aftid: {
            minLength: 1,
            type: 'string',
          },
        },
      },
      agreementDescriptionShortcutsDto: {
        type: 'object',
        properties: {
          descriptionName: {
            type: 'string',
          },
          showShortcut: {
            type: 'boolean',
            nullable: true,
          },
        },
      },
      organizationStructureDto: {
        type: 'object',
        properties: {
          childOrgs: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/organizationStructureDto',
            },
          },
          companyName: {
            type: 'string',
          },
          companyType: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          companyTypeName: {
            type: 'string',
          },
          orgId: {
            type: 'string',
          },
          cvrNumber: {
            type: 'string',
          },
        },
      },
      problemDetails: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          status: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          detail: {
            type: 'string',
          },
          instance: {
            type: 'string',
          },
          extensions: {
            type: 'object',
            additionalProperties: {
              type: 'object',
            },
          },
        },
      },
      teamListViewDto: {
        type: 'object',
        properties: {
          skiName: {
            type: 'string',
          },
          skiDescription: {
            type: 'string',
          },
          skiOrdernumber: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
        },
      },
      organizationRelationSummaryDto: {
        type: 'object',
        properties: {
          relationRoleName: {
            type: 'string',
          },
          companyName: {
            type: 'string',
          },
          companyType: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          companyTypeName: {
            type: 'string',
          },
          orgId: {
            type: 'string',
          },
          cvrNumber: {
            type: 'string',
          },
        },
      },
      trafficLightOutputDto: {
        type: 'object',
        properties: {
          applicationType: {
            type: 'string',
          },
          applicationLabel: {
            type: 'string',
          },
          applicationDescription: {
            type: 'string',
          },
          conditionsDescription: {
            type: 'string',
          },
          selectedApplicationOption: {
            type: 'string',
          },
          agreementId: {
            type: 'string',
          },
          mainAgreementGuid: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          aftaleKundeStartDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          aftaleKundeEndDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          endOfLateSignUpPeriod: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          expirationDateMaxUtc: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          startDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          endDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          agreementName: {
            type: 'string',
          },
          customerCvr: {
            type: 'string',
          },
          customerOrgId: {
            type: 'string',
          },
          customerId: {
            type: 'string',
          },
          customerName: {
            type: 'string',
          },
          agreementGuid: {
            type: 'string',
            format: 'uuid',
          },
        },
      },
      employeeListViewDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          firstname: {
            type: 'string',
          },
          lastname: {
            type: 'string',
          },
          jobtitle: {
            type: 'string',
          },
          mail: {
            type: 'string',
          },
          telephone: {
            type: 'string',
          },
          linkedIn: {
            type: 'string',
          },
          ordernumber: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          url: {
            type: 'string',
          },
          team: {
            type: 'string',
          },
          picture: {
            type: 'string',
          },
        },
      },
      contactPersonOrganizationListViewDto: {
        type: 'object',
        properties: {
          role: {
            type: 'string',
          },
          fullname: {
            type: 'string',
          },
          phone: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          jobTitle: {
            type: 'string',
          },
          agreement: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
        },
      },
      statusupdateListViewDto: {
        type: 'object',
        properties: {
          agreementStatusUpdate: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/agreementStatusUpdateDto',
            },
          },
          category: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      calendarDbDto: {
        type: 'object',
        properties: {
          skiCalendarId: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          skiAgreement: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          skiStartdate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          skiName: {
            type: 'string',
          },
          skiAlternativeenddate: {
            type: 'string',
          },
          skiCalendartheme: {
            type: 'string',
            format: 'uuid',
            nullable: true,
          },
          includeInExcel: {
            type: 'boolean',
            nullable: true,
          },
        },
      },
      relatedAgreementsListViewDto: {
        type: 'object',
        properties: {
          agreementId: {
            type: 'string',
          },
          fullName: {
            type: 'string',
          },
          displayNameShort: {
            type: 'string',
          },
          displayNumbers: {
            type: 'string',
          },
          expirationDateUtc: {
            type: 'string',
          },
          expirationDateMaxUtc: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
        },
      },
      agreementsWithSuppliersResponse: {
        type: 'object',
        properties: {
          agreements: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/agreement',
            },
          },
        },
      },
      crmSkiExtensionListViewDto: {
        type: 'object',
        properties: {
          optionNumber: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          optionIntoForceDateUtc: {
            type: 'string',
          },
          optionLength: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
        },
      },
      agreementSearchDto: {
        type: 'object',
        properties: {
          agreementId: {
            type: 'string',
          },
          displayNameLong: {
            type: 'string',
          },
          displayNameShort: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          displayNumbers: {
            type: 'string',
          },
          phase: {
            type: 'string',
          },
          overallStatusName: {
            type: 'string',
          },
          keywords: {
            type: 'string',
          },
          teaser: {
            type: 'string',
          },
          group: {
            type: 'string',
          },
          sourcingPrograms: {
            type: 'string',
          },
          intoForceDateUtc: {
            type: 'string',
          },
          expiryDateUtc: {
            type: 'string',
          },
          mainAgreementId: {
            type: 'string',
          },
        },
      },
      keywordDto: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
          },
        },
      },
      supplier: {
        type: 'object',
        properties: {
          organizationId: {
            type: 'string',
          },
          supplierName: {
            type: 'string',
          },
        },
      },
      supplierReportDto: {
        type: 'object',
        properties: {
          supplierReportGuid: {
            type: 'string',
            format: 'uuid',
          },
          supplierReporteportingCode: {
            type: 'integer',
            format: 'int32',
            nullable: true,
          },
          supplierReportShareProcent: {
            type: 'number',
            format: 'double',
            nullable: true,
          },
          supplierReportSharePerUnit: {
            type: 'number',
            format: 'double',
            nullable: true,
          },
          supplierReportStartDate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          supplierReportEndate: {
            type: 'string',
            format: 'date-time',
            nullable: true,
          },
          autoApproveReports: {
            type: 'boolean',
          },
        },
      },
      skiApprovalsListViewDto: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
        },
      },
    },
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Bearer',
      },
    },
  },
  paths: {
    '/status-update/{id}': {
      get: {
        tags: ['Agreement Status'],
        operationId: 'GetAgreementStatusUpdateById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of StatusUpdateViewDto',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/statusUpdateViewDto',
                },
              },
            },
          },
        },
      },
    },
    '/organization/{id}': {
      get: {
        tags: ['OrganizationInfo'],
        operationId: 'GetOrganizationById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'reduced',
            in: 'query',
            style: 'form',
            schema: {
              type: 'boolean',
            },
          },
          {
            name: 'agreementIds',
            in: 'query',
            style: 'form',
            explode: false,
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of OrganizationListViewDto',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/organizationListViewDto',
                },
              },
            },
          },
          '404': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/agreement/{id}/customer-summary': {
      get: {
        tags: ['AgreementCustomerSummary'],
        operationId: 'GetAgreementSummaryById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of AgreementCustomerSummary',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/agreementCustomerSummary',
                },
              },
            },
          },
          '404': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
      },
    },
    '/organization/{id}/customer': {
      get: {
        tags: ['OrganizationCustomerList'],
        operationId: 'GetOrganizationCustomerList',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of Array of CustomerListDtoWrapper',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/customerListDtoWrapper',
                  },
                },
              },
            },
          },
          '404': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/agreement/{id}/faq': {
      get: {
        tags: ['AgreementsFaqs'],
        operationId: 'GetAgreementFaqs',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of Array of FaqListViewDto',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/faqListViewDto',
                  },
                },
              },
            },
          },
          '404': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
      },
    },
    '/agreements-with-suppliers': {
      get: {
        tags: ['Agreements'],
        operationId: 'GetAgreementsWithSuppliers',
        responses: {
          '200': {
            description: 'Payload of AgreementsWithSuppliersResponse',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/agreementsWithSuppliersResponse',
                },
              },
            },
          },
          '500': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
      },
    },
    '/document/{id}/keepalive': {
      get: {
        tags: ['KeepAlive'],
        operationId: 'DocumentsKeepAlive',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of String',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '503': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
      },
    },
    '/agreement-application': {
      get: {
        tags: ['Traffic light'],
        operationId: 'GetTrafficLight',
        parameters: [
          {
            name: 'agreementid',
            in: 'query',
            description:
              '8-digit id for the SKI agreement or tender (e.g. 50480022)',
            style: 'form',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'orgid',
            in: 'query',
            description: 'Customer company id (e.g. 35300400)',
            style: 'form',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of Array of TrafficLightOutputDto',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/trafficLightOutputDto',
                  },
                },
              },
            },
          },
          '404': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '400': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/user/{id}/status-update-subscription': {
      get: {
        tags: ['AgreementsStatusUpdate'],
        operationId: 'GetStatusUpdateAgreementsByUserId',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of AgreementListViewDtoWrapper',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/agreementListViewDtoWrapper',
                },
              },
            },
          },
          '404': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
          '403': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
        security: [
          {
            BearerAuth: [],
          },
        ],
      },
      put: {
        tags: ['Agreements'],
        operationId: 'DurableStatusUpdateFunctionHttpStart',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          description: 'The aftaleID of the agreement post',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/statusUpdatesRequest',
              },
            },
          },
        },
        responses: {
          '202': {
            description: 'Payload of Int32',
            content: {
              'application/json': {
                schema: {
                  type: 'integer',
                  format: 'int32',
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Subscription Status Update'],
        operationId: 'PostUserSubscriptionToStatusUpdate',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          description: 'The aftaleID of the agreement post',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/skiAgreementRequest',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'No description',
          },
          '400': {
            description: 'No description',
          },
        },
      },
    },
    '/organization/{orgId}/related-organizations': {
      get: {
        tags: ['RelatedOrganization'],
        operationId: 'GetRelatedOrganizations',
        parameters: [
          {
            name: 'orgId',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'orgRelationNames',
            in: 'query',
            required: true,
            style: 'form',
            explode: false,
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of Array of OrganizationRelationSummaryDto',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/organizationRelationSummaryDto',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/employee/{id}/keepalive': {
      get: {
        tags: ['KeepAlive'],
        operationId: 'EmployeesKeepAlive',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of String',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '503': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
      },
    },
    '/organization/{orgId}/agreement/{aftId}/report': {
      put: {
        tags: ['TerminateSupplierReport'],
        operationId: 'TerminateSupplierReports',
        parameters: [
          {
            name: 'aftId',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'orgId',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'action',
            in: 'query',
            description:
              'What shall happen to the supplierreport(s) on the agreement',
            required: true,
            style: 'form',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'enddate',
            in: 'query',
            description: 'When the supplierreport(s) shall end',
            required: true,
            style: 'form',
            schema: {
              type: 'string',
              format: 'date-time',
            },
          },
        ],
        responses: {
          '204': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '404': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '400': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '401': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '403': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
        security: [
          {
            BearerAuth: [],
          },
        ],
      },
    },
    '/organization': {
      get: {
        tags: ['OrganizationInfo'],
        operationId: 'GetOrganizations',
        parameters: [
          {
            name: 'q',
            in: 'query',
            description:
              'What period the organizations agreements should report on',
            required: true,
            style: 'form',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'role',
            in: 'query',
            description: 'What role the organizations should have, must be',
            style: 'form',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'expand',
            in: 'query',
            description: 'What expanded data should be shown',
            style: 'form',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of Array of OrganizationDto',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/organizationDto',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/employee': {
      get: {
        tags: ['Employee Details'],
        operationId: 'GetEmployees',
        responses: {
          '200': {
            description: 'Payload of EmployeeListViewDtoWrapper',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/employeeListViewDtoWrapper',
                },
              },
            },
          },
          '404': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
        'x-ski-cache-max-age': 3600,
      },
    },
    '/organization/{orgId}/supplier-agreement': {
      get: {
        tags: ['OrganizationList'],
        operationId: 'GetOrganizationAgreementList',
        parameters: [
          {
            name: 'orgId',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'endDateAfter',
            in: 'query',
            description:
              'Henter aftaler med indrapporteringsaftaler med slutdato efter denne dato',
            style: 'form',
            schema: {
              type: 'string',
              format: 'date-time',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of OrganizationAgreementList',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/organizationAgreementList',
                },
              },
            },
          },
        },
      },
    },
    '/organization-search': {
      get: {
        tags: ['Organization search data'],
        operationId: 'GetOrganizationSearchData',
        responses: {
          '200': {
            description: 'Payload of Array of OrganizationSearchDto',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/organizationSearchDto',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/agreement/{id}': {
      get: {
        tags: ['Agreements'],
        operationId: 'GetAgreementById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'reduced',
            in: 'query',
            style: 'form',
            schema: {
              type: 'boolean',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of AgreementDto',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/agreementDto',
                },
              },
            },
          },
          '404': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
          '503': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
        'x-ski-cache-max-age': 300,
      },
    },
    '/document/{id}': {
      get: {
        tags: ['Documents'],
        operationId: 'GetDocumentById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of FileContentResult',
            content: {
              'application/pdf': {
                schema: {
                  $ref: '#/components/schemas/fileContentResult',
                },
              },
            },
          },
          '404': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
          '403': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
      },
    },
    '/status-update/{id}/keepalive': {
      get: {
        tags: ['KeepAlive'],
        operationId: 'StatusUpdateKeepAlive',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of String',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '503': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
      },
    },
    '/agreement/{id}/supplier': {
      get: {
        tags: ['AgreementSupplierList'],
        operationId: 'GetAgreementsSupplierList',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'reduced',
            in: 'query',
            style: 'form',
            schema: {
              type: 'boolean',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of SupplierListViewDtoWrapper',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/supplierListViewDtoWrapper',
                },
              },
            },
          },
          '404': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
      },
    },
    '/agreement/{id}/description': {
      get: {
        tags: ['AgreementsDescriptions'],
        operationId: 'GetAgreementDescriptions',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of Array of DescriptionListViewDto',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/descriptionListViewDto',
                  },
                },
              },
            },
          },
          '404': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
      },
    },
    '/organization/{orgId}/agreement/{agreementId}': {
      get: {
        tags: ['OrganizationAgreement'],
        operationId: 'GetOrganizationAgreement',
        parameters: [
          {
            name: 'agreementId',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'orgId',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of AgreementDto',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/agreementDto',
                },
              },
            },
          },
          '404': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '400': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '401': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
        security: [
          {
            BearerAuth: [],
          },
        ],
      },
    },
    '/agreement/{id}/keepalive': {
      get: {
        tags: ['KeepAlive'],
        operationId: 'AgreementsKeepAlive',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of String',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '503': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
      },
    },
    '/agreement': {
      get: {
        tags: ['Agreements'],
        operationId: 'GetAgreements',
        parameters: [
          {
            name: 'status',
            in: 'query',
            description:
              'Kind of agreements. Possible values: tender, agreement, expired',
            style: 'form',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'reduced',
            in: 'query',
            style: 'form',
            schema: {
              type: 'boolean',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of AgreementListViewDtoWrapper',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/agreementListViewDtoWrapper',
                },
              },
            },
          },
          '503': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
        'x-ski-cache-max-age': 300,
      },
    },
    '/agreement/{id}/status-update': {
      get: {
        tags: ['AgreementsStatusUpdate'],
        operationId: 'GetAgreementStatusUpdate',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of StatusupdateListViewDto',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/statusupdateListViewDto',
                },
              },
            },
          },
          '404': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
          '503': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
      },
    },
    '/user/{id}/status-update-subscription/task': {
      get: {
        tags: ['Status'],
        operationId: 'GetStatus',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description:
              'This is the email of the person and is used as unique identifier',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of Object',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
          '202': {
            description: 'Payload of Object',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
          '404': {
            description: 'Payload of Object',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
        },
      },
    },
    '/organization/{id}/structure': {
      get: {
        tags: ['OrganizationInfo'],
        operationId: 'GetOrganizationStructure',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of OrganizationStructureDto',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/organizationStructureDto',
                },
              },
            },
          },
          '404': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '400': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
        'x-ski-cache-max-age': 298,
      },
    },
    '/agreement-application/{id}/keepalive': {
      get: {
        tags: ['KeepAlive'],
        operationId: 'TrafficLightKeepAlive',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of String',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '503': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
      },
    },
    '/agreement-search': {
      get: {
        tags: ['AgreementsSearchData'],
        operationId: 'GetAgreementsSearchData',
        responses: {
          '200': {
            description: 'Payload of Array of AgreementSearchDto',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/agreementSearchDto',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/agreement/{id}/customer': {
      get: {
        tags: ['AgreementCustomerList'],
        operationId: 'GetAgreementsCustomerList',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of Array of CustomerListApplicationViewDto',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/customerListApplicationViewDto',
                  },
                },
              },
            },
          },
          '404': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
      },
    },
    '/employee/{id}': {
      get: {
        tags: ['Employee Details'],
        operationId: 'GetEmployeeById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of Array of EmployeeListViewDtoWrapper',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/employeeListViewDtoWrapper',
                  },
                },
              },
            },
          },
          '404': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/organization/{id}/keepalive': {
      get: {
        tags: ['KeepAlive'],
        operationId: 'OrganizationsKeepAlive',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            style: 'simple',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of String',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
          '503': {
            description: 'Payload of ProblemDetails',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/problemDetails',
                },
              },
            },
          },
        },
      },
    },
    '/organization/search/filtered-organizationlist': {
      get: {
        tags: ['OrganizationInfo'],
        operationId: 'GetFilteredOrganizationList',
        parameters: [
          {
            name: 'orgIds',
            in: 'query',
            description:
              'Filter result by organization ids. (orgIds and orgType are mutually exclusive parameters)',
            style: 'form',
            explode: false,
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
          {
            name: 'orgType',
            in: 'query',
            description:
              'Filter by organization type. Can be either the integer value or type name. (orgIds and orgType are mutually exclusive parameters)',
            style: 'form',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of Array of OrganizationStructureDto',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/organizationStructureDto',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
        'x-ski-cache-max-age': 300,
      },
    },
    '/agreement-calendar': {
      get: {
        tags: ['AgreementsCriticalDates'],
        operationId: 'GetCriticalAftaleDatoer',
        parameters: [
          {
            name: 'include',
            in: 'query',
            description: 'List of properties to be included in the response',
            style: 'form',
            schema: {
              type: 'string',
            },
          },
          {
            name: 'exclude-subagreements',
            in: 'query',
            description:
              'Bool value that indicates if subagreements should be excluded in the response',
            style: 'form',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Payload of String',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
        'x-ski-cache-max-age': 20,
      },
    },
  },
  openapi: '3.0.1',
  servers: [
    {
      url: 'https://api2.ski.dk/stamdata/v1/',
    },
  ],
  info: {
    description: 'Api for SKI Stamdata',
    version: 'v1',
    title: 'Stamdata API',
  },
};
