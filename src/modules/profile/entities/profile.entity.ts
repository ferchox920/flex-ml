import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { EcommerceEntity } from 'src/modules/ecommerces/entities/ecommerce.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier for the profile' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'john_doe', description: 'Unique nickname for the profile' })
  nickname: string;

  @Column({ nullable: true, type: 'date' })
  @ApiPropertyOptional({ example: '2021-01-01', description: 'Date of registration for the profile' })
  registrationDate: Date;

  @Column({ nullable: true })
  @ApiPropertyOptional({ example: 'John', description: 'First name of the user' })
  firstName: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ example: 'Doe', description: 'Last name of the user' })
  lastName: string;

  @Column()
  @ApiProperty({ example: 'M', description: 'Gender of the user' })
  gender: string;

  @Column()
  @ApiProperty({ example: 'AR', description: 'Country code of the user' })
  countryId: string;

  @Column()
  @ApiProperty({ example: 'john@example.com', description: 'Email address of the user' })
  email: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ example: '123456789', description: 'Identification number of the user' })
  identificationNumber: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ example: 'DNI', description: 'Type of identification of the user' })
  identificationType: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ example: '123 Main St', description: 'Address of the user' })
  address: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ example: 'Cityville', description: 'City of the user' })
  city: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ example: 'Stateland', description: 'State of the user' })
  state: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ example: '12345', description: 'Zip code of the user' })
  zipCode: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ example: '123', description: 'Area code of the user\'s phone' })
  areaCode: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ example: '456', description: 'Extension of the user\'s phone' })
  extension: string;

  @Column()
  @ApiProperty({ example: '555-1234', description: 'Phone number of the user' })
  phoneNumber: string;

  @Column({ default: false })
  @ApiProperty({ example: false, description: 'Flag indicating whether the phone number is verified' })
  phoneVerified: boolean;


  // Alternative phone
  @Column({ nullable: true })
  @ApiPropertyOptional()
  alternativeAreaCode: string;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  alternativeExtension: string;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  alternativePhoneNumber: string;

  @Column()
  @ApiProperty()
  userType: string;

  @Column({ type: 'simple-array' })
  @ApiProperty({ type: 'array', items: { type: 'string' } })
  tags: string[];

  @Column({ nullable: true })
  @ApiPropertyOptional()
  logo: string;

  @Column()
  @ApiProperty()
  points: number;

  @Column()
  @ApiProperty()
  siteId: string;

  @Column()
  @ApiProperty()
  permalink: string;

  @Column()
  @ApiProperty()
  sellerExperience: string;

  // Bill data
  @Column({ nullable: true })
  @ApiPropertyOptional()
  acceptCreditNote: boolean;

  // Seller reputation
  @Column({ nullable: true })
  @ApiPropertyOptional()
  sellerReputationLevelId: string;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  powerSellerStatus: string;

  // Transactions
  @Column({ default: 0 })
  @ApiProperty()
  canceledTransactions: number;

  @Column({ default: 0 })
  @ApiProperty()
  completedTransactions: number;

  @Column({ default: 0 })
  @ApiProperty()
  totalTransactions: number;

  // Ratings
  @Column({ default: 0 })
  @ApiProperty()
  negativeRatings: number;

  @Column({ default: 0 })
  @ApiProperty()
  neutralRatings: number;

  @Column({ default: 0 })
  @ApiProperty()
  positiveRatings: number;

  // Sales metrics (consider merging with SellerReputation for clarity)
  @Column({ nullable: true })
  @ApiPropertyOptional()
  salesCompleted: number;

  // Claims metrics (consider merging with SellerReputation for clarity)
  @Column({ nullable: true })
  @ApiPropertyOptional()
  claimsRate: number;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  claimsValue: number;

  // Delayed handling time metrics (consider merging with SellerReputation for clarity)
  @Column({ nullable: true })
  @ApiPropertyOptional()
  delayedHandlingTimeRate: number;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  delayedHandlingTimeValue: number;

  // Buyer reputation
  @Column({ default: 0 })
  @ApiProperty()
  canceledBuyerTransactions: number;

  @Column({ type: 'simple-array' })
  @ApiProperty({ type: 'array', items: { type: 'string' } })
  buyerTags: string[];

  // Not rated transactions (consider merging with BuyerReputation for clarity)
  @Column({ default: 0 })
  @ApiProperty()
  notRatedTransactions: number;

  // Unrated transactions (consider merging with BuyerReputation for clarity)
  @Column({ default: 0 })
  @ApiProperty()
  unratedTransactions: number;

  // Status
  @Column({ default: true })
  @ApiProperty()
  confirmedEmail: boolean;

  // Mercadoenvios (consider merging with Status for clarity)
  @Column()
  @ApiProperty()
  mercadoenviosStatus: string;

  // Mercadopago account type (consider merging with Status for clarity)
  @Column()
  @ApiProperty()
  mercadopagoAccountType: string;


  // Other fields and relationships (adjust as needed)

  @OneToOne(() => EcommerceEntity, (ecommerce) => ecommerce.profile)
  @JoinColumn({ name: 'ecommerce_id' })
  ecommerce: EcommerceEntity;

  @CreateDateColumn({ type: 'timestamptz', default: () => `now()` })
  createdAt: Date;

  constructor(partial: Partial<ProfileEntity>) {
    Object.assign(this, partial);
  }
}
